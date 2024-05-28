import { Link, Form } from "@remix-run/react";
import { UserWithRelations } from "~/models/user.server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavBarProps {
  user?: UserWithRelations;
}

export const NavBar = ({ user }: NavBarProps) => {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-5 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">Negrify</Link>
      </h1>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-16 w-16 mr-4 rounded-full">
              <img
                className="w-full rounded-full"
                src={user.dj?.avatar || user.cliente?.avatar}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Link className="w-full" to="/perfil">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Form className="w-full" action="/logout" method="post">
                <button className="w-full text-left" type="submit">
                  Log out
                </button>
              </Form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
