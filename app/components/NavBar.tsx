import { Link, Form } from "@remix-run/react";
import { UserWithRelations } from "~/models/user.server";

interface NavBarProps {
  user?: UserWithRelations;
}

export const NavBar = ({ user }: NavBarProps) => {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">Negrify</Link>
      </h1>
      {user ? (
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Salir
          </button>
        </Form>
      ) : (
        <Link to="/login">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Ingresar
          </button>
        </Link>
      )}
    </header>
  );
};
