import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { hasActiveMembership, CONTRACT_ADDRESS } from './alchemy';

/**
 * BillOfRightsContent React component.
 *
 */
export function BillOfRightsContent() {
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
              path: '/',
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
        <div className="m-4 mx-auto max-w-xl text-left font-newtimesroman">
          
          <h2 className="text-xl font-bold">Bill of Rights</h2>
          <br />
          <ol className="max-w-md space-y-1 text-gray-600 list-decimal list-outside ms-4 dark:text-gray-600 ">
            <li><b>Freedom of Expression and Creativity:</b> The Builders Advocacy Group (BAG) recognizes the right of its members to freely express themselves and engage in creative pursuits in the metaverse, without fear of censorship or discrimination.</li>

            <li><b>Privacy and Protection of Personal Data:</b> The BAG will work to ensure that members' personal data is protected and kept confidential, and that members have control over their own data and privacy.</li>

            <li><b>Control of One's Creations:</b> The BAG recognizes the right of members to have full control over their own creations and intellectual property in the metaverse.</li>

            <li><b>Fair and Open Marketplace:</b> The BAG will work to promote a fair and open marketplace in the metaverse, free from anti-competitive practices and manipulation.</li>

            <li><b>Access to Resources and Tools:</b> The BAG will work to ensure that members have access to the resources and tools they need to build and create in the metaverse.</li>

            <li><b>Decentralized and Transparent Governance:</b> The BAG will work to promote decentralized and transparent governance in the metaverse, to ensure that all members have a voice and a say in the direction of the organization.</li>

            <li><b>Member Representation:</b> The BAG will work to ensure that all members have a representative voice within the organization and that their interests are being effectively represented.</li>


            <li><b>Protection from Discrimination:</b> The BAG will work to ensure that members are protected from discrimination based on race, gender, religion, sexual orientation, or any other factor.</li>

            <li><b>Equal Access to Opportunities:</b> The BAG will work to promote equal access to opportunities for all members, regardless of their background or experience.</li>

            <li><b>Support for Member Initiatives:</b> The BAG will provide support for member initiatives and projects, to help members realize their full potential in the metaverse.</li>
          </ol>
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
