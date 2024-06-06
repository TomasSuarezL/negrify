import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { z, ZodError } from "zod";
import ClienteFields from "~/components/perfil/ClienteFields";
import DJFields from "~/components/perfil/DJFields";
import { Button } from "~/components/ui/button";

import { Label } from "~/components/ui/label";
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
    .getAll("generos[]")
    .map((entry) => entry.toString());
  const referencias: string[] = formData
    .getAll("referencias[]")
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
    rate: z.coerce.number().gt(0),
  });

  try {
    const { nombre, apellido, pais, ciudad, direccion, avatar } =
      perfilSchema.parse(formPayload);

    if (formPayload["dj-mode"]) {
      const { descripcion, rate } = djSchema.parse(formPayload);

      const dj = await createDJ({
        nombre,
        apellido,
        userId,
        avatar,
        descripcion,
        generos,
        rate,
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

  const [isDJ, setIsDJ] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center w-full p-8 overflow-auto">
      <h3 className="text-5xl pb-8">Crear Nuevo Perfil</h3>
      <Form
        method="post"
        className="flex flex-col gap-1 w-5/6 max-w-4xl p-8 border bg-slate-50 mb-8"
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
        <ClienteFields
          nombre={{ error: actionData?.errors?.nombre }}
          apellido={{ error: actionData?.errors?.apellido }}
          avatar={{ error: actionData?.errors?.avatar }}
          pais={{ error: actionData?.errors?.pais }}
          ciudad={{ error: actionData?.errors?.ciudad }}
          direccion={{ error: actionData?.errors?.direccion }}
        />
        {isDJ ? (
          <DJFields
            descripcion={{ error: actionData?.errors?.descripcion }}
            rate={{ error: actionData?.errors?.rate }}
            generos={{ error: actionData?.errors?.generos }}
            referencias={{ error: actionData?.errors?.referencias }}
          />
        ) : null}
        <div className="text-right">
          <Button type="submit">Guardar</Button>
        </div>
      </Form>
    </div>
  );
}
