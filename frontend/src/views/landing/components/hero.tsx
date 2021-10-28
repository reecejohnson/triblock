import { GradientSpan } from "../index.styles";

const Hero = () => {
  return (
    <div className="text-4xl md:text-6xl font-bold tracking-tight text-center text-gray-600">
      <span>
        Completely on-chain art.
        <br />
        Built with <GradientSpan>Tailwind CSS</GradientSpan> colours. <br />
        Stored on the <GradientSpan>Ethereum</GradientSpan> blockchain.
      </span>
    </div>
  );
};

export default Hero;
