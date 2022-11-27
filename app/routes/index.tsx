import { Link } from "@remix-run/react";

export default function IndexRoute() {
  // My guess is this is a anti-pattern?
  const linkClasses = "underline text-orange-600 hover:text-orange-400";

  return (
    <div className="md:container md:rounded md:mx-auto md:my-10 text-center md:shadow-lg p-10 bg-white">
      <h1 className="text-3xl pb-5">Remix Jokes</h1>
      <ul className="list-none">
        <li className="list-item">
          <Link className={linkClasses} to="/jokes">
            Read Jokes
          </Link>
        </li>
        <li className="list-item">
          <a
            className={linkClasses}
            href="https://github.com/AnthonyRinaldi/remix-jokes"
          >
            Github
          </a>
        </li>
      </ul>
    </div>
  );
}
