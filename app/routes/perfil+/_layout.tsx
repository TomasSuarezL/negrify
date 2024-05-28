import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet } from "@remix-run/react";
import { NavBar } from "~/components/NavBar";
import { useOptionalUser } from "~/lib/routingUtils";

import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  return json({ userId });
};

export default function NotesPage() {
  const user = useOptionalUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <NavBar user={user} />

      <main className="flex h-full bg-slate-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
