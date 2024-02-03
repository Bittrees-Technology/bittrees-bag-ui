import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { hasActiveMembership, CONTRACT_ADDRESS } from "./alchemy";

/**
 * MembersContent React component.
 *
 */
export function MembersContent() {
  const [loading, setLoading] = useState(true);
  const [hasValidMembership, setHasValidMembership] = useState(false);
  const [cookies, setCookie] = useCookies([CONTRACT_ADDRESS]);

  const { address, isConnected, isConnecting } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
    },
  });

  useEffect(() => {
    let token = cookies[CONTRACT_ADDRESS];
    if (!token) {
      console.log("isConnected: " + isConnected);
      if (!(address && isConnected)) {
        setHasValidMembership(false);
        return;
      }

      hasActiveMembership(address)
        .then((hasActiveMembership) => {
          if (hasActiveMembership) {
            setCookie(CONTRACT_ADDRESS, address, {
              path: "/",
            });
          }
          setHasValidMembership(hasActiveMembership);
        })
        .catch((err) => {
          console.error(err);
          setHasValidMembership(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setHasValidMembership(true);
      setLoading(false);
    }
  }, [address, isConnected, cookies, setCookie]);

  return (
    <>
      <div className="mt-4 font-newtimesroman">
        {!address && (
          <p className="text-2xl mt-4">Please connect your wallet.</p>
        )}
        {loading && isConnecting && <p className="text-2xl mt-4">Loading...</p>}
      </div>

      {hasValidMembership && (
        <div className="m-4 mx-auto max-w-xl">
          <h2 className="text-xl font-newtimesroman font-bold">
            Member Services
          </h2>
          <br />
          <div className="grid grid-cols-2 gap-6">
            <div className="text-left font-newtimesroman">
              <ul className="max-w-md space-y-1 text-gray-400 list-disc list-outside ms-4 dark:text-gray-400 ">
                <li className="p-2">Gift Membership</li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://etherscan.io/token/0x6e8c260cb878489c8066dd75536e5e9b5ca4c288#code"
                  >
                    Membership Contract
                  </a>
                </li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.metaforo.io/g/bag/"
                  >
                    Forum
                  </a>
                </li>
                <li className="p-2">Snapshot</li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://guild.xyz/bag"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left font-newtimesroman">
              <ul className="max-w-md space-y-1 text-gray-400 list-disc list-outside ms-4 dark:text-gray-400 ">
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    href="/visionstatement"
                  >
                    Vision Statement
                  </a>
                </li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.google.com/document/d/1BxcIkhfPnMf305VxGrEgEnfH2de_kFkL1iE43dI1WRo/edit?usp=sharing"
                  >
                    Constitution [draft]
                  </a>
                </li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    href="/billofrights"
                  >
                    Bill of Rights
                  </a>
                </li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://docs.google.com/drawings/d/1s1c37-FNRjz3ZZP35UCWn-4viLZrAmQoMG1Q-IL7QQU/edit?usp=sharing"
                  >
                    Org Chart Diagram
                  </a>
                </li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/voxelsadvocacy"
                  >
                    Twitter
                  </a>
                </li>
                <li className="p-2">
                  <a
                    className="text-black no-underline hover:underline hover:text-green-700"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.voxels.com/play?coords=W@242W,572N,6U"
                  >
                    Clubhouse
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {!hasValidMembership && (
        <div className="m-4 mx-auto max-w-xl font-newtimesroman">
          <a href="/mint">Please go mint your membership!</a>
        </div>
      )}
    </>
  );
}
