import { SpotifyInstaller } from "@/components/SpotifyInstaller";
import { useEffect, useState } from "react";

const Index = () => {
  //localStorage.setItem("warningClicked", "false");

  const [clicked, setClicked] = useState(
    localStorage.getItem("warningClicked") === "true"
  );
  const [showInstaller, setShowInstaller] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("warningClicked") === "true") {
      setShowInstaller(true);
    }
  }, []);
  const handleClick = () => {
    setClicked(true);

    localStorage.setItem("warningClicked", "true");
    setTimeout(() => {
      setShowInstaller(true); // now render SpotifyInstaller
    }, 2000);
  };

  // Render either warning or main page
  return (
    <div className="h-full w-full">
      {showInstaller ? (
        <SpotifyInstaller />
      ) : (
        <div className={`flex items-center justify-center h-screen w-full `}>
          <div
            className={`flex flex-col items-center justify-center h-[100%] transition-all duration-1000 gap-y-7 ${
              clicked ? "opacity-0 h-0" : "opacity-100 max-h-[100vh]"
            }`}
          >
            <span className="errors text-center text-2xl text-[#DBB2B9]">
              Please note, you can only host a room if you are a premium user..
              <br /> This will only be showed once, click OK to proceed
            </span>
            <button
              onClick={handleClick}
              className={`installer-button transition-opacity bg-[#DBB2B9] opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 hover:cursor-pointer ${
                clicked ? "opacity-0" : "opacity-100"
              }`}
              style={{ background: "#DBB2B9" }}
            >
              OK
            </button>
          </div>
          <div
            className={`container absolute transition-opacity duration-1000 ${
              clicked ? "opacity-100" : "opacity-0"
            }`}
            style={{ "--uib-size": "100px" } as React.CSSProperties}
          >
            <div className="cube"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
