import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <header className="bg-base-200 h-40">
        <div className="flex p-4 items-center justify-center">
          <div className="flex-1"></div>
          <div className="flex-0">
            <ConnectButton />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mt-4">Heading</h1>
      </header>
      <main className="text-center mt-6">Content</main>
    </div>
  );
}

export default App;
