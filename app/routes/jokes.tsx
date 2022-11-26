import { Outlet } from "@remix-run/react";

export default function JokesRoute() {
  return (
    <div className="container bg-white rounded-lg p-10">
      <h1 className="text-3xl pb-5">J🤪KES</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
