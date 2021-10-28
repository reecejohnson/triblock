import { useEffect, useState } from "react";
import { allColours } from "lib/colours";
import TriBolt from "./tri-bolt";

export type Colours = {
  firstColour: string;
  secondColour: string;
  thirdColour: string;
};

interface IProps {
  useLargeImage?: boolean;
}

const AnimatedTriBolt = ({ useLargeImage }: IProps) => {
  const [colours, setColours] = useState<Colours>({
    firstColour: allColours[generateRandomColourIndex()],
    secondColour: allColours[generateRandomColourIndex()],
    thirdColour: allColours[generateRandomColourIndex()],
  });

  function generateRandomColourIndex() {
    return Math.floor(Math.random() * allColours.length);
  }

  function changeColour(previousColour: string): string {
    const shouldChangeColour = Math.random() < 0.5;
    let number = generateRandomColourIndex();
    return shouldChangeColour ? allColours[number] : previousColour;
  }

  function pickRandomColours(): Colours {
    return {
      firstColour: changeColour(colours.firstColour),
      secondColour: changeColour(colours.secondColour),
      thirdColour: changeColour(colours.thirdColour),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setColours(pickRandomColours());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <TriBolt colours={colours} useLargeImage={useLargeImage ?? false} />
    </div>
  );
};

export default AnimatedTriBolt;
