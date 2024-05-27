import { NavLink, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
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
        <div key={dj.id} className="flex flex-row bg-slate-100 p-4">
          <div className="flex w-48 h-48">
            <img className="w-full object-cover" src={dj.avatar} />
          </div>
          <div className="flex flex-col p-6">
            <p className="text-2xl font-black">{dj.nombre}</p>
            <p className="italic">
              {dj.generos.map((g) => g.descripcion).join(" - ")}
            </p>
            <p>{`${dj.rate}$ / hora`}</p>
            <div className="flex-1 flex flex-row space-x-4 items-end">
              <NavLink to={dj.id}>
                <Button>Ver Perfil</Button>
              </NavLink>
              <Button variant={"secondary"}>Contratar</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
