import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MembersContent } from "./MembersContent";

function MembersPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="bg-primary h-56">
        <div className="flex p-4 items-start justify-center">
          <div className="flex-1">&nbsp;</div>
        </div>
        <div className="text-7xl font-bold text-center mt-4">[B | Â | G]</div>
      </header>

      <main className="text-center bg-[#dedede]">
        <div className="flex flex-col gap-3 p-4 md:p-12 items-center">


          <div className="mt-4">
            <MembersContent />
          </div>

          <footer className="flex flex-col gap-6 mx-auto mt-4">
            <span>
            <div>
              <ConnectButton />
            </div>
            </span>

            <div className="flex w-full justify-center items-center">
              <a href="/" className="mx-auto">
                <img
                  src="/bag-logo-circle-smaller.png"
                  width="128px"
                  height="128px"
                  alt="Business Advocacy Group logo"
                  className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
                />
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default MembersPage;
