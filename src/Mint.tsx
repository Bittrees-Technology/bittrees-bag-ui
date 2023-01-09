import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";
import abi from "./abi.json";
import { goerli } from "wagmi/chains";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x3ed570c2917EC8bEa558174697F28B24fc09ec09";

export function Mint({ totalEth }: { totalEth: string }) {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "mint",
    chainId: goerli.id,
    args: [address, 0, []],
    overrides: { value: ethers.utils.parseEther(totalEth) },
  });
  const { isLoading, write } = useContractWrite(config);

  function onClick() {
    write?.();
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={onClick}>
        Mint
      </button>
      {isLoading && <p>Minting...</p>}
    </div>
  );
}
