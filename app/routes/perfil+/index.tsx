import { Link } from "@remix-run/react";

import { useUser } from "~/lib/routingUtils";

export default function NoteIndexPage() {
  const user = useUser();

  if (!user.dj && !user.Cliente) {
    return (
      <>
        <h5>Aun no tiene un perfil</h5>
        <Link to="new" className="text-blue-500 underline">
          Crear perfil.
        </Link>
      </>
    );
  }

  return <p>Perfil</p>;
}
