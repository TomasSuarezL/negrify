import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, Link, redirect } from "@remix-run/react";

import { getUserId } from "~/session.server";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/perfil");
  return json({});
};

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white flex-col sm:flex sm:justify-center sm:items-center">
      <div className="absolute top-9">
        <h1 className="font-['Manrope'] font-black text-7xl mix-blend-difference text-white after:pl-4 after:block after:w-12 after:absolute after:bg-black after:mix-blend-difference after:content-['']">
          Negrify
        </h1>
      </div>
      <div className="flex-1 flex flex-row w-full h-full">
        <div className="flex-1 flex flex-col items-center justify-center bg-black text-white">
          <Link
            to="/djs"
            className="border-4 border-white p-5 text-3xl font-black transition-colors duration-500 hover:text-black hover:border-black hover:bg-white"
          >
            Buscar DJs
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Link
            to="/login"
            className="border-4 border-black p-5 text-3xl font-black transition-colors duration-500 hover:text-white hover:border-white hover:bg-black"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </main>
  );
}
