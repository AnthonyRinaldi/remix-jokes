import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

import { Joke } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = {
  jokeListItems: Array<{ id: string; name: string }>;
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    jokeListItems: await db.joke.findMany({
      take: 5,
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return json(data);
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="container bg-white rounded-lg p-10">
      <h1 className="text-3xl pb-5">J🤪KES</h1>
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
