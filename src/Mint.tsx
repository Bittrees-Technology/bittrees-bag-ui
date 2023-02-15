import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import abi from "./abi.json";
import { goerli, mainnet } from "wagmi/chains";
import { ethers } from "ethers";
import { useState } from "react";

const CONTRACT_ADDRESS = "0x6e8c260cB878489c8066Dd75536e5E9B5ca4C288";
const chainId =
  process.env.REACT_APP_ENABLE_TESTNETS === "true" ? goerli.id : mainnet.id;

console.info(`Contract: ${CONTRACT_ADDRESS}`);
console.info(`Chain ID: ${chainId}`);

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

  const { config, error } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "mintMembership",
    chainId: chainId,
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
      {error && (
        <div className="text-red-500 m-4 mx-auto max-w-xl">
          An error occurred preparing the transaction:{" "}
          {error.message.startsWith(
            "insufficient funds for intrinsic transaction cost"
          )
            ? "insufficient funds for intrinsic transaction cost."
            : error.message}
        </div>
      )}

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={onClick}
          disabled={!Boolean(address) || Boolean(error)}
        >
          Mint
        </button>

        {!address && (
          <p className="text-2xl mt-4">Please connect your wallet.</p>
        )}
        {isLoading && <p className="text-2xl mt-4">Minting...</p>}
      </div>
    </>
  );
}
