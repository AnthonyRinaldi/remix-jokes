import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  jokeListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const jokeListItems = await db.joke.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });

  const data: LoaderData = {
    jokeListItems,
    user,
  };
  return json(data);
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="md:container bg-white rounded-lg md:m-10 p-10">
      <header>
        <h1 className="text-3xl pb-5">J🤪KES</h1>
        {data.user ? (
          <div className="user-info">
            <span>{`Hi ${data.user.username}`}</span>
            <form action="/logout" method="post">
              <button type="submit" className="button">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
      <main>
        <div className="flex flex-row">
          <div className="basis-1/3">
            <Link to="." className="text-orange-600">
              Get a random joke
            </Link>
            <p>Here are a few more jokes to check out:</p>
            <ul className="list-disc">
              {data.jokeListItems.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="text-orange-600">
              Add your own
            </Link>
          </div>
          <div className="basis-2/3">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
