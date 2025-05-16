import "../styles/globals.css";
import Button from "../components/button";
import Header from "../components/header";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-center">
          <li className="font-title">
            Test Title
          </li>
          <li className="text-red-700">
            Test Primary
          </li>
          <li className="text-yellow-400">
            Test Secondary
          </li>
          <li className="text-blue-600">
            Test Tertiary
          </li>
          <li>
            <Button color="primary">
              Test Button
            </Button>
          </li>
          <li>
            <Button color="secondary">
              Test Button
            </Button>
          </li>
          <li>
            <Button color="tertiary">
              Test Button
            </Button>
          </li>
        </ol>
      </main>
    </div>
  );
}
