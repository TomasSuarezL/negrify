import { Link } from "@remix-run/react";

import { useUser } from "~/lib/routingUtils";

export default function NoteIndexPage() {
  const user = useUser();

  if (!user.dj && !user.cliente) {
    return (
      <>
        <h5>Aun no tiene un perfil</h5>
        <Link to="new" className="text-blue-500 underline">
          Crear perfil.
        </Link>
      </>
    );
  }

  const profile = user.cliente || user.dj;

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex w-1/3 max-w-48">
          <img src={profile?.avatar} />
        </div>
        <div className="flex-1">
          <p>{user.cliente?.nombre || user.dj?.nombre}</p>
        </div>
      </div>
    </div>
  );
}
