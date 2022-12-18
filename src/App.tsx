import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <header className="bg-primary h-56">
        <div className="flex p-4 items-start justify-center">
          <div className="flex-1">
            <img
              src="/bag-logo-circle-smaller.png"
              width="128px"
              height="128px"
              alt="Business Advocacy Group logo"
            />
          </div>
          <div className="flex-0">
            <ConnectButton />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mt-4">
          Builders Advocacy Group
        </h1>
      </header>
      <main className="text-center bg-[#eef3ee]">
        <div className="flex flex-col gap-6 p-6">
          <div className="text-xl">BAG Membership</div>
          <div className="mx-auto">
            <img
              src="/bag-briefcase.jpeg"
              width="256px"
              height="256px"
              alt="Business Advocacy Group logo"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 justify-start">
            <div className="text-right">Membership Mint Price:</div>
            <div className="text-left">0.005 ETH</div>
          </div>
          <div>
            <button className="btn btn-primary">Mint</button>
          </div>
          <div>
            Description: Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Laboriosam deserunt ad facere praesentium quos obcaecati
            deleniti qui quia quibusdam perspiciatis consequatur nesciunt,
            similique minus quo temporibus nulla, earum perferendis incidunt.
          </div>
          <footer className="flex gap-6 mx-auto">
            <div className="underline">
              <a href="https://twitter.com/voxelsadvocacy" target="_blank">
                @voxelsadvocacy
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
