import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

// import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  // const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white flex-col sm:flex sm:justify-center sm:items-center">
      <div className="absolute top-9">
        <h1 className="font-black text-7xl">Negrify</h1>
      </div>
      <div className="flex-1 flex flex-row w-full h-full">
        <div className="flex-1 flex flex-col items-center justify-center bg-black text-white">
          <Link to="/notes">View Notes</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Link to="/notes">View Notes</Link>
        </div>
      </div>
    </main>
  );
}
