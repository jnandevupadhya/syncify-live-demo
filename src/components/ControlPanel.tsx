import { useEffect, useState } from "react";
import { BackgroundPickerRef } from "./ui/BackgroundPicker";
import { MainPanel } from "./MainPanel";
import { Logo } from "./ui/Logo";

type Props = {
  bgRef: React.RefObject<HTMLImageElement>;
  bgPickerRef: React.RefObject<BackgroundPickerRef>;
};

export const SpotifyInstaller = ({ bgRef, bgPickerRef }: Props) => {
  const [isReady, setIsReady] = useState(false);


  return (
    <section data-scrollbar>
      <div className="min-h-screen transition-all px-4 py-6">
        <div className="w-full">
          <main className="transition-all duration-400">
            <div className="w-full">
              <Logo />
              <MainPanel />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
