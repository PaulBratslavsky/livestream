import { StrapiImage } from "./StrapiImage";

interface MusicHeadingProps {
  data: {
    heading: string;
    text: string;
    image: {
      url: string;
      alternativeText: string;
    }
  };
  children?: React.ReactNode;
}

export function MusicHeading({ data, children }: Readonly<MusicHeadingProps>) {

  const { heading, text, image } = data;

  return (
    <header className="relative h-[450px] overflow-hidden">
      <StrapiImage
        src={image.url}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full aspect-auto z-0"
        height={1080}
        width={1920}
      />
      <div className="relative z-10  h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-60">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl ">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl mb-4">{text}</p>
        <div className="container sm:w-full  md:w-[575px] text-pink-600 font-semibold">
          {children}
        </div>
      </div>
    </header>
  );
}
