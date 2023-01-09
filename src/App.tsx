import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Mint } from "./Mint";
import { useState } from "react";

const mintPrice = "0.0100";

function App() {
  const [total, setTotal] = useState(mintPrice);

  function calcTotal(donation: string) {
    const total = (
      parseFloat(mintPrice) + parseFloat(donation ? donation : "0")
    ).toFixed(4);
    setTotal(total);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <header className="bg-primary h-56">
        <div className="flex p-4 items-start justify-center">
          <div className="flex-1">&nbsp;</div>
          <div className="flex-0">
            <ConnectButton />
          </div>
        </div>
        <div className="text-7xl font-bold text-center mt-4">[B | A | G]</div>
        <h1 className="text-lg font-bold text-center mt-4">
          Builders Advocacy Group
        </h1>
      </header>

      <main className="text-center bg-[#eef3ee]">
        <div className="flex flex-col gap-3 p-6">
          <div className="mx-auto">
            <div className="text-xl">BAG Membership</div>
            <img
              src="/bag-briefcase.jpeg"
              width="256px"
              height="256px"
              alt="Business Advocacy Group logo"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 justify-start">
            <div className="text-right">Membership Mint Price:</div>
            <div className="text-left">{mintPrice} ETH</div>
            <div className="text-right">Add additional donation:</div>
            <div className="text-left">
              <input
                className="w-20 input-sm"
                type="number"
                placeholder="0.00"
                onChange={(e) => calcTotal(e.target.value)}
                step="0.01"
                min="0"
              />{" "}
              <span>ETH</span>
            </div>
            <div className="text-right">Total price:</div>
            <div className="text-left">
              {total} <span>ETH</span>
            </div>
          </div>
          <div>
            <Mint totalEth={total} />
          </div>
          <div className="mt-8">
            Builders Advocacy Group (BAG) is a Representative Body, Unifying
            &amp; Amplifying the Experience of Voxels Builders.
          </div>
          <div>Become a Member to Have Your Voice Heard.</div>
          <footer className="flex flex-col gap-6 mx-auto">
            <div className="underline">
              <a
                href="https://twitter.com/voxelsadvocacy"
                target="_blank"
                rel="noreferrer"
              >
                @voxelsadvocacy
              </a>
            </div>
            <div>
              <img
                src="/bag-logo-circle-smaller.png"
                width="128px"
                height="128px"
                alt="Business Advocacy Group logo"
              />
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
