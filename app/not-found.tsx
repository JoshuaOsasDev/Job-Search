export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
      <h1 className="mb-4 text-7xl font-extrabold text-gray-400 dark:text-gray-500">
        404
      </h1>
      <h2 className="mb-2 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-gray-500 dark:text-gray-400">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="rounded-lg bg-gray-300 px-4 py-2 transition hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        Go back home
      </a>
    </main>
  );
}
