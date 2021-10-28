import { GradientSpan } from "../index.styles";

const UniqueColours = () => {
  return (
    <div className="max-w-3xl mx-auto text-center my-10">
      <p className="text-sm font-semibold tracking-widest text-gray-600 text-opacity-70 uppercase">
        <span className="mr-2">&#127752;</span> Each Colour Scheme Unique
        <span className="ml-2">&#127752;</span>
      </p>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-600  sm:text-4xl lg:text-5xl">
        128 beautiful hand-selected colours and 128 programmatically generated combinations. <br />{" "}
        What will you get?
      </h2>
      <p className="mt-3 text-xl leading-relaxed text-gray-500 sm:mt-4">
        Each TriBolt is{" "}
        <GradientSpan className="font-semibold">generated completely on-chain</GradientSpan> where
        each of the 128 colours can only be used 3 times, once in each bolt position, making every
        TriBolt a unique 1/1. Once each variation has been created, the generator will not allow
        further editions and TriBolts will only be available on the secondary market.
      </p>
    </div>
  );
};

export default UniqueColours;
