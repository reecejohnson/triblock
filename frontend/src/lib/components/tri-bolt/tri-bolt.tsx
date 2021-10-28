import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { desktopMinWidth } from "lib/screen-sizes";
import { Colours } from "./index";

interface IProps {
  colours: Colours;
  useLargeImage: boolean;
}

const TriBolt = ({
  colours: { firstColour, secondColour, thirdColour },
  useLargeImage,
}: IProps) => {
  const isDesktop = useMedia(desktopMinWidth);
  const [imageSize, setImageSize] = useState<number>(500);

  useEffect(() => {
    setImageSize(calculateImageSize());
  }, [isDesktop]);

  function calculateImageSize() {
    return isDesktop && useLargeImage ? 500 : 300;
  }

  return (
    <div className="h-full z-10">
      <svg width={imageSize}
           height={imageSize} viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M105.424 50H73.1356L50 155.547L72.8814 155.766L50.6356 251L110 122.852H83.5593L105.424 50Z"  fill={firstColour} />
        <path d="M301.424 50H269.136L246 155.547L268.881 155.766L246.636 251L306 122.852H279.559L301.424 50Z" fill={secondColour}/>
        <path d="M203.424 99H171.136L148 204.547L170.881 204.766L148.636 300L208 171.852H181.559L203.424 99Z" fill={thirdColour} />
      </svg>

    </div>
  );
};

export default TriBolt;
