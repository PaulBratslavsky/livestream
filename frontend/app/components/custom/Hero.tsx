import { Link } from "@remix-run/react";
import { buttonVariants } from "~/components/ui/button";

import BackgroundImage from "./BackgroundImage";
import { Music } from "~/routes/resources.music";

interface ImageProps {
  id: number;
  url: string;
  alternativeText: string;
}

interface ButtonLinkProps {
  id: number;
  text: string;
  isExternal: boolean;
  type: string;
  href: string;
}

interface HeroProps {
  heading: string;
  text: string;
  image: ImageProps;
  buttonLink: ButtonLinkProps[];
}

function ButtonLink({ data }: { readonly data: ButtonLinkProps }) {
  const { text, isExternal, href } = data;

  return (
    <Link
      to={href}
      target={isExternal ? "_blank" : "_self"}
      className={`w-full md:w-1/3 ${buttonVariants({
        variant: "outline",
      })}`}
    >
      {text}
    </Link>
  );
}

export function Hero({ data }: { readonly data: HeroProps }) {
  const { heading, text, image, buttonLink } = data;
  return (
    <section className="py-20 md:py-32 relative min-h-[calc(100vh-56px)]">
      <div className="container h-full grid lg:grid-cols-2 place-items-center gap-10 p-16 ">
        <div className="text-center lg:text-start space-y-6 z-50">
          <div className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#ffa6e0]  to-[#f032d6] text-transparent bg-clip-text">
                {heading}
              </span>
            </h1>
          </div>

          <p className="text-xl text-white md:w-10/12 mx-auto lg:mx-0">
            {text}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            {buttonLink
              ? buttonLink.map((link: ButtonLinkProps) => (
                  <ButtonLink key={link.id} data={link} />
                ))
              : null}
          </div>
        </div>

        <div className="z-50">
          <div className="text-white h-[160px] overflow-scroll my-4">
            <Music />
          </div>
        </div>
      </div>
      <BackgroundImage image={image} />
    </section>
  );
}
