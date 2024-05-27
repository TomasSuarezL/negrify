import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { isDj, ubicacionToString } from "~/lib/utils";

import { getClienteByUserId } from "~/models/cliente.server";
import { getDjByUserId } from "~/models/dj.server";
import { getUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  invariant(userId, "userId must be defined");

  const user =
    (await getDjByUserId(userId)) ?? (await getClienteByUserId(userId));
  return user;
};

export default function NoteIndexPage() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return (
      <>
        <h5>Aun no tiene un perfil</h5>
        <Link to="new" className="text-blue-500 underline">
          Crear perfil.
        </Link>
      </>
    );
  }

  return (
    <div className="relative container pt-8 mt-8 mb-8 w-100 bg-slate-50">
      <div className="absolute top-0 left-0 bg-slate-900 h-60 w-full"></div>
      <div className="relative top-0 left-0 flex flex-col px-8">
        <div className="flex flex-row mt-16">
          <div className="flex w-full max-w-48">
            <img className="w-full" src={data?.avatar} />
          </div>
          <div className="flex-1 flex flex-col p-6 space-y-3">
            <h4 className="text-slate-50 text-4xl font-black">
              {data?.nombre}
            </h4>
            {data.ubicacion && (
              <p className="text-slate-50 text-xl font-light italic">
                {ubicacionToString(data.ubicacion)}
              </p>
            )}
          </div>
        </div>
        {isDj(data) && (
          <div className="flex flex-col justify-center">
            <p className="p-6 text-2xl font-extralight">{data?.descripcion}</p>
          </div>
        )}
      </div>
    </div>
  );
}
