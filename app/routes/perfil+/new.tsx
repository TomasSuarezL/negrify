import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { z, ZodError } from "zod";
import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { MultiInput } from "~/components/ui/multiInput";
import { Switch } from "~/components/ui/switch";
import { createCliente } from "~/models/cliente.server";
import { createDJ } from "~/models/dj.server";
import { createUbicacion } from "~/models/ubicacion.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const generos: string[] = formData
    .getAll("generos")
    .map((entry) => entry.toString());
  const referencias: string[] = formData
    .getAll("referencias")
    .map((entry) => entry.toString());

  const perfilSchema = z.object({
    nombre: z.string().min(2),
    apellido: z.string().min(2),
    pais: z.string().min(2),
    ciudad: z.string().min(2),
    direccion: z.string().min(2),
    avatar: z.string().min(2),
  });

  const djSchema = z.object({
    descripcion: z.string(),
  });

  try {
    let id = null;
    const { nombre, apellido, pais, ciudad, direccion, avatar } =
      perfilSchema.parse(formPayload);

    if (!!formPayload["dj-mode"]) {
      const { descripcion } = djSchema.parse(formPayload);

      const dj = await createDJ({
        nombre,
        userId,
        avatar,
        descripcion,
        generos,
        background: "",
        artistasReferencias: referencias,
      });

      // ToDo: Move to atomic transaction;?
      await createUbicacion({
        pais,
        ciudad,
        direccion,
        longitud: null,
        latitud: null,
        clienteId: null,
        djId: dj.id,
      });
    } else {
      const cliente = await createCliente({
        nombre,
        userId,
        apellido,
        avatar,
      });

      id = cliente.id;

      // ToDo: Move to atomic transaction;?
      await createUbicacion({
        pais,
        ciudad,
        direccion,
        longitud: null,
        latitud: null,
        clienteId: cliente.id,
        djId: null,
      });
    }

    return redirect("/perfil");
  } catch (error) {
    let errorMap: Record<keyof typeof formPayload, string> = {};
    if (error instanceof ZodError) {
      errorMap = error.issues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.path[0]]: issue.message,
        }),
        {},
      );
    } else {
      errorMap = { error: `${error}` };
    }
    return json({ errors: errorMap }, { status: 400 });
  }
};

export default function NewPerfilPage() {
  const actionData = useActionData<typeof action>();
  const nombreRef = useRef<HTMLInputElement>(null);
  const apellidoRef = useRef<HTMLInputElement>(null);
  const paisRef = useRef<HTMLInputElement>(null);
  const ciudadRef = useRef<HTMLInputElement>(null);
  const direccionRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);

  const [isDJ, setIsDJ] = useState(false);

  useEffect(() => {
    console.log(actionData?.errors?.nombre);
    if (actionData?.errors?.nombre) {
      nombreRef.current?.focus();
    } else if (actionData?.errors?.apellido) {
      paisRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex-1 flex flex-col items-center w-full p-8 overflow-auto">
      <h3 className="text-5xl pb-8">Crear Nuevo Perfil</h3>
      <Form
        method="post"
        className="flex-1 flex flex-col gap-1 w-5/6 max-w-4xl p-8 border bg-slate-50 mb-8"
      >
        <div className="flex items-center space-x-2 pb-8">
          <Switch
            id="dj-mode"
            name="dj-mode"
            checked={isDJ}
            onCheckedChange={() => setIsDJ(!isDJ)}
          />
          <Label htmlFor="dj-mode">Sos DJ?</Label>
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            type="text"
            role="textbox"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            ref={nombreRef}
            aria-invalid={actionData?.errors?.nombre ? true : undefined}
            aria-errormessage={
              actionData?.errors?.nombre ? "nombre-error" : undefined
            }
          />
          {actionData?.errors?.nombre ? (
            <div className="pt-1 h-8 text-red-700" id="nombre-error">
              {actionData.errors.nombre}
            </div>
          ) : (
            <div className="pt-1 h-8"></div>
          )}
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            ref={apellidoRef}
            aria-invalid={actionData?.errors?.apellido ? true : undefined}
            aria-errormessage={
              actionData?.errors?.apellido ? "apellido-error" : undefined
            }
          />
          {actionData?.errors?.apellido ? (
            <div className="pt-1 h-8 text-red-700" id="apellido-error">
              {actionData.errors.apellido}
            </div>
          ) : (
            <div className="pt-1 h-8"></div>
          )}
        </div>
        <div className="flex flex-row w-full items-center space-x-2">
          <div className="flex-1 grid items-center gap-1.5">
            <Label htmlFor="pais">Pais</Label>
            <Input
              type="text"
              id="pais"
              name="pais"
              placeholder="Pais"
              ref={paisRef}
              aria-invalid={actionData?.errors?.pais ? true : undefined}
              aria-errormessage={
                actionData?.errors?.pais ? "pais-error" : undefined
              }
            />
            {actionData?.errors?.apellido ? (
              <div className="pt-1 h-8 text-red-700" id="apellido-error">
                {actionData.errors.apellido}
              </div>
            ) : (
              <div className="pt-1 h-8"></div>
            )}
          </div>
          <div className="flex-1 grid items-center gap-1.5">
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input
              type="text"
              id="ciudad"
              name="ciudad"
              placeholder="Ciudad"
              ref={ciudadRef}
              aria-invalid={actionData?.errors?.ciudad ? true : undefined}
              aria-errormessage={
                actionData?.errors?.ciudad ? "ciudad-error" : undefined
              }
            />
            {actionData?.errors?.ciudad ? (
              <div className="pt-1 h-8 text-red-700" id="ciudad-error">
                {actionData.errors.ciudad}
              </div>
            ) : (
              <div className="pt-1 h-8"></div>
            )}
          </div>
          <div className="flex-1 grid items-center gap-1.5">
            <Label htmlFor="direccion">Direccion</Label>
            <Input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Direccion"
              ref={direccionRef}
              aria-invalid={actionData?.errors?.direccion ? true : undefined}
              aria-errormessage={
                actionData?.errors?.direccion ? "direccion-error" : undefined
              }
            />
            {actionData?.errors?.direccion ? (
              <div className="pt-1 h-8 text-red-700" id="direccion-error">
                {actionData.errors.direccion}
              </div>
            ) : (
              <div className="pt-1 h-8"></div>
            )}
          </div>
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="avatar">Avatar</Label>
          <Input
            type="text"
            id="avatar"
            name="avatar"
            placeholder="Avatar"
            ref={avatarRef}
            aria-invalid={actionData?.errors?.avatar ? true : undefined}
            aria-errormessage={
              actionData?.errors?.avatar ? "avatar-error" : undefined
            }
          />
          {actionData?.errors?.avatar ? (
            <div className="pt-1 h-8 text-red-700" id="avatar-error">
              {actionData.errors.avatar}
            </div>
          ) : (
            <div className="pt-1 h-8"></div>
          )}
        </div>
        {isDJ && (
          <>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="descripcion">Descripcion</Label>
              <Input
                type="text"
                id="descripcion"
                name="descripcion"
                placeholder="Descripcion"
                ref={descripcionRef}
                aria-invalid={
                  actionData?.errors?.descripcion ? true : undefined
                }
                aria-errormessage={
                  actionData?.errors?.descripcion
                    ? "descripcion-error"
                    : undefined
                }
              />
              {actionData?.errors?.avatar ? (
                <div className="pt-1 h-8 text-red-700" id="avatar-error">
                  {actionData.errors.avatar}
                </div>
              ) : (
                <div className="pt-1 h-8"></div>
              )}
            </div>
            <Label htmlFor="generos">Generos</Label>
            <MultiInput
              name="generos"
              placeholder="Generos"
              error={actionData?.errors.generos}
            />
            <Label htmlFor="referencias">Referencias</Label>
            <MultiInput
              name="referencias"
              placeholder="Artistas referencias"
              error={actionData?.errors.referencias}
            />
          </>
        )}
        <div className="text-right">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}
