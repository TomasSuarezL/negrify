import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/ui/button";
import { ubicacionToString } from "~/lib/utils";
import { getDjById } from "~/models/dj.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.djId, "djId not found");

  const dj = await getDjById(params.djId);
  if (!dj) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(dj);
};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="relative container pt-8 mt-8 mb-8 w-100 bg-slate-50">
      <div className="absolute top-0 left-0 bg-slate-900 h-60 w-full"></div>
      <div className="relative top-0 left-0 flex flex-col px-8 h-full">
        <div className="flex flex-row mt-16">
          <div className="flex w-full max-w-48">
            <img className="w-full" src={data?.avatar} />
          </div>
          <div className="flex-1 flex flex-col p-6 space-y-2">
            <h4 className="text-slate-50 text-4xl font-black">
              {data?.nombre}
            </h4>
            <p className="text-slate-50 text-xl font-light italic">
              {data.generos.map((g) => g.descripcion).join(" - ")}
            </p>
            {data.ubicacion && (
              <p className="text-slate-50 text-xl font-light italic">
                {ubicacionToString(data.ubicacion)}
              </p>
            )}
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-xl flex flex-row space-x-2 pb-2 border-b">
            <p>Referencias: </p>
            <p>{data.artistasReferencias.map((r) => r.nombre).join(" - ")}</p>
          </div>
          <p className="mt-2 text-2xl font-extralight">{data?.descripcion}</p>
          <div className="flex-1"></div>
          <Button>Enviar Mensaje</Button>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>DJ not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
