import { useLoaderData } from "@remix-run/react";
import { getDJs } from "~/models/dj.server";

export const loader = async () => {
  const data = await getDJs();

  return { data };
};

export default function DjIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-y-4 p-8 w-full h-full container">
      {data.data.map((dj) => (
        <div key={dj.id} className="flex flex-row bg-slate-50 p-4">
          <div className="flex w-48 h-48">
            <img className="w-full object-cover" src={dj.avatar} />
          </div>
          <div className="flex flex-col">
            <p>{dj.nombre}</p>
            <div className="flex flex-row">
              {dj.generos.map((g) => (
                <p key={g.id}>{g.descripcion}</p>
              ))}
            </div>
            <p>{dj.generos.map((g) => g.descripcion).join(" - ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}