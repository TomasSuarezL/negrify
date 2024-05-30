import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { z, ZodError } from "zod";
import ClienteFields from "~/components/perfil/ClienteFields";
import DJFields from "~/components/perfil/DJFields";
import { Button } from "~/components/ui/button";

import { isDj } from "~/lib/utils";
import { createCliente, getClienteByUserId } from "~/models/cliente.server";
import { createDJ, getDjByUserId } from "~/models/dj.server";
import { createUbicacion } from "~/models/ubicacion.server";
import { getUserId, requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  invariant(userId, "userId must be defined");

  const user =
    (await getDjByUserId(userId)) ?? (await getClienteByUserId(userId));
  return user;
};

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
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col items-center w-full p-8 overflow-auto">
      <h3 className="text-5xl pb-8">Editar Perfil</h3>
      <Form
        method="PATCH"
        className="flex flex-col gap-1 w-5/6 max-w-4xl p-8 border bg-slate-50 mb-8"
      >
        <ClienteFields
          nombre={{ value: data?.nombre, error: actionData?.errors.nombre }}
          apellido={{
            value: data?.apellido,
            error: actionData?.errors.apellido,
          }}
          pais={{
            value: data?.ubicacion?.pais,
            error: actionData?.errors.pais,
          }}
          ciudad={{
            value: data?.ubicacion?.ciudad,
            error: actionData?.errors.ciudad,
          }}
          direccion={{
            value: data?.ubicacion?.direccion,
            error: actionData?.errors.direccion,
          }}
          avatar={{ value: data?.avatar, error: actionData?.errors.avatar }}
        />
        {isDj(data) ? (
          <DJFields
            descripcion={{
              value: data?.descripcion,
              error: actionData?.errors?.descripcion,
            }}
            rate={{
              value: data?.rate.toString(),
              error: actionData?.errors?.rate,
            }}
            generos={{
              value: data.generos.map((g) => g.descripcion),
              error: actionData?.errors?.generos,
            }}
            referencias={{
              value: data.artistasReferencias.map((a) => a.nombre),
              error: actionData?.errors?.referencias,
            }}
          />
        ) : null}
        <div className="text-right">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}
