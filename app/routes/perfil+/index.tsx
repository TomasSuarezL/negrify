import { Link } from "@remix-run/react";

import { useUser } from "~/lib/routingUtils";

export default function NoteIndexPage() {
  const user = useUser();

  console.log(user);

  if (!user.dj || !user.Cliente) {
    return (
      <p>
        Aun no tiene un perfil
        <Link to="new" className="text-blue-500 underline">
          Crear perfil.
        </Link>
      </p>
    );
  }

  return <p>Perfil</p>;
}
