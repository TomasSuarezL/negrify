import { Outlet } from "@remix-run/react";
import { NavBar } from "~/components/NavBar";

import { useOptionalUser } from "~/lib/routingUtils";

export default function DjsPage() {
  const user = useOptionalUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <NavBar user={user} />

      <main className="flex h-full bg-white">
        <Outlet />
      </main>
    </div>
  );
}
