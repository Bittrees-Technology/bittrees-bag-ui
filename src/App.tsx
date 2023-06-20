import { Link } from "react-router-dom";

function App() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="bg-primary h-56">
        <div className="flex p-4 items-start justify-center">
          <div className="flex-1">&nbsp;</div>
        </div>
        <div className="text-7xl font-bold text-center mt-4">[B | Â | G]</div>
      </header>

      <main className="text-center bg-[#eef3ee]">
        <div className="flex flex-col gap-6 p-6">
          <div className="mx-auto border border-black p-4 w-80 h-80 shadow-md shadow-gray-500 hover:shadow-black">
            <Link to="/mint" className="flex flex-col items-center">
              <div className="text-xl">Mint Membership</div>
              <img
                src="/bag-briefcase.png"
                width="256px"
                height="256px"
                alt="Business Advocacy Group logo"
              />
            </Link>
          </div>
          <div className="mx-auto border border-black p-4 w-80 h-64 flex flex-col justify-center items-center shadow-md shadow-gray-500 hover:shadow-black">

            <Link to="/members" className="flex flex-col items-center">
              <div className="text-xl">Members Only Services</div>
              
            </Link>
          </div>

          <footer className="flex flex-col md:flex-row gap-6 mx-auto mt-8 items-center justify-around">
            <div className="underline w-60">
              <a
                href="https://twitter.com/voxelsadvocacy"
                target="_blank"
                rel="noreferrer"
              >
                @voxelsadvocacy
              </a>
            </div>
            <div className="flex justify-center">
              <Link to="/mint">
                <img
                  src="/bag-logo-circle-smaller.png"
                  width="128px"
                  height="128px"
                  alt="Business Advocacy Group logo"
                  className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
                />
              </Link>
            </div>
            <div className="underline w-60">
              <a
                href="https://voxelsadvocacy.gitbook.io/bag/builders-advocacy-group/welcome"
                target="_blank"
                rel="noreferrer"
              >
                Gitbook
              </a>
            </div>
          </footer>
        </div>
      </main>


    </div>
  );
}

export default App;
