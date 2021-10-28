import { useMedia } from "react-use";
import { desktopMinWidth, xlDesktopMinWidth } from "lib/screen-sizes";
import AnimatedTriBolt from "lib/components/tri-bolt";

const AnimatedTriBolts = () => {
  const isDesktop = useMedia(desktopMinWidth);
  const isXlDesktop = useMedia(xlDesktopMinWidth);

  return (
    <div className="justify-center gap-48 md:flex xl:justify-between xl:gap-0">
      <AnimatedTriBolt />
      {isDesktop && <AnimatedTriBolt />}
      {isXlDesktop && <AnimatedTriBolt />}
    </div>
  );
};

export default AnimatedTriBolts;
