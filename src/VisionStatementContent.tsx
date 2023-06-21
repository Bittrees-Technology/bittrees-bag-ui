import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { hasActiveMembership, CONTRACT_ADDRESS } from './alchemy';

/**
 * VisionStatementContent React component.
 *
 */
export function VisionStatementContent() {
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
        <div className="m-4 mx-auto max-w-xl">
          <h2 className="text-xl font-bold font-newtimesroman text-left">Vision Statement</h2>
          <br />
          <div className="text-l font-newtimesroman text-left">

            The Builders Advocacy Group (BAG) envisions a metaverse where every builder and creator has the freedom, support, and equal opportunities to bring their imaginations to life. As a proactive and progressive metaverse political organization, we stand firmly committed to advocating for the rights and interests of all builders, fostering an environment that celebrates diversity, innovation, and collaboration.
            <br/><br/>
            At the heart of our vision is the belief that every individual in the metaverse should be empowered to express themselves freely and unleash their creativity without fear of censorship or discrimination. We uphold the principles of open-source, recognizing its immense potential to drive innovation, encourage shared knowledge, and promote a thriving ecosystem for builders.
            <br/><br/>
            The Bill of Rights serves as our guiding compass, ensuring that builders are equipped with the necessary protections and freedoms. We relentlessly advocate for freedom of expression and creativity, promoting an inclusive metaverse where ideas can flourish and diverse voices are heard. We prioritize the privacy and protection of personal data, empowering builders to maintain control over their own creations and intellectual property.
            <br/><br/>
            As the BAG, we champion an open and transparent metaverse marketplace, opposing any anti-competitive practices and manipulation. We strive to provide equal access to resources and tools, ensuring that every builder has the necessary means to unleash their potential. Collaboration, community-driven development, and decentralized governance lie at the core of our principles, enabling builders to actively participate in shaping the metaverse's future.
            <br/><br/>
            Through our unwavering commitment to the principles of openness, inclusivity, and advocacy, we envision a metaverse that transcends boundaries and fosters a vibrant and thriving community of builders. Together, we can create a metaverse where innovation knows no bounds, where builders are celebrated and supported, and where the possibilities for creation are truly limitless.
            <br/><br/>
            Join us in shaping the future of the metaverse, where the Builders Advocacy Group (BAG) stands as a steadfast advocate for all builders, ensuring their rights, promoting open-source initiatives, and forging a path towards a metaverse that reflects the collective aspirations and creativity of its diverse community. Together, we can build a metaverse that inspires, empowers, and transforms the way we connect and create.
            <br/><br/>
            Best, Jonathan

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
