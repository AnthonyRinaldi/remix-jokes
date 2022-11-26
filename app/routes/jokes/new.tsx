export default function NewJokeRoute() {
  return (
    <div>
      <p>Add your own new Joke</p>
      <form method="post">
        <div>
          <label>
            {"Name: "}
            <input
              className="border-2 border-gray rounded"
              type="text"
              name="name"
            />
          </label>
        </div>
        <div>
          <label>
            {"Content: "}
            <textarea className="border-2 border-gray rounded" name="content" />
          </label>
        </div>
        <div className="mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
