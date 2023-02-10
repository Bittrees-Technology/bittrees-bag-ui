import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import abi from "./abi.json";
import { goerli } from "wagmi/chains";
import { ethers } from "ethers";
import { useState } from "react";

const CONTRACT_ADDRESS = "0x6e8c260cB878489c8066Dd75536e5E9B5ca4C288";

const mintPrice = "0.0100";

export function Mint() {
  const [total, setTotal] = useState(mintPrice);

  function calcTotal(donation: string) {
    const total = (
      parseFloat(mintPrice) + parseFloat(donation ? donation : "0")
    ).toFixed(4);
    setTotal(total);
  }

  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "mintMembership",
    chainId: goerli.id,
    args: [address],
    overrides: { value: ethers.utils.parseEther(total) },
  });
  const { isLoading, write } = useContractWrite(config);

  function onClick() {
    write?.();
  }

  return (
    <>
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
      <div className="mt-4">
        <button className="btn btn-primary" onClick={onClick} disabled={!Boolean(address)}>
          Mint
        </button>
        {!address && <p className="text-2xl mt-4">Please connect your wallet above.</p>}
        {isLoading && <p className="text-2xl mt-4">Minting...</p>}
      </div>
    </>
  );
}
