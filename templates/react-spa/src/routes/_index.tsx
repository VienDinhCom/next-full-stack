import logo from "@src/assets/react.svg";

export default function Page() {
  return (
    <div className="text-center">
      <header className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-lg text-white">
        <img src={logo} className="h-[40vmin]" alt="logo" />
        <p className="mb-8">
          Edit <code className="font-mono">`src/routes/_index.tsx`</code> and
          save to reload.
        </p>
        <p>
          <a
            href="https://deves.deno.dev"
            className="mx-2 me-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            target="_blank"
            rel="noreferrer"
          >
            Learn Deves
          </a>
          <a
            href="https://reactjs.org"
            className="mx-2 me-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            target="_blank"
            rel="noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}
