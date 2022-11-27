import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Link, useActionData, useCatch } from "@remix-run/react";
import Button from "~/components/Button";

import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return "The joke is too short";
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return "The joke's name is too short";
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    content: string | undefined;
  };
  fields?: {
    name: string;
    content: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return json({});
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");

  if (typeof name !== "string" || typeof content !== "string") {
    return badRequest({ formError: "Form not submitted correctly" });
  }

  const fields = { name, content };

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  const joke = await db.joke.create({
    data: { ...fields, jokesterId: userId },
  });
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <p>Add your own new Joke</p>
      <form method="post">
        <div>
          <label>
            {"Name: "}
            <input
              className="border border-gray rounded shadow-sm invalid:border-red-500 invalid:text-red-600"
              defaultValue={actionData?.fields?.name}
              type="text"
              name="name"
              aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p className="text-red-500" role="alert" id="name-error">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            {"Content: "}
            <textarea
              className="border border-gray rounded shadow-sm invalid:border-red-500 invalid:text-red-600"
              defaultValue={actionData?.fields?.content}
              name="content"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p className="text-red-500" role="alert" id="content-error">
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div className="mt-5">
          {actionData?.formError ? (
            <p className="text-red-500" role="alert">
              {actionData.formError}
            </p>
          ) : null}
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <div className="md:container md:rounded md:mx-auto my-10 text-center md:shadow-lg p-10 bg-white border-red-500">
        <p>You must be logged in to create a joke.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export function ErrorBoundary() {
  return (
    <div className="md:container md:rounded md:mx-auto my-10 text-center md:shadow-lg p-10 bg-white border-red-500">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
