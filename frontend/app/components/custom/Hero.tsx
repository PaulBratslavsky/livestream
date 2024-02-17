import { Link } from "@remix-run/react";
import { buttonVariants } from "~/components/ui/button";

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
  const { text, isExternal, type, href } = data;

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
  const imageUrl = "http://localhost:1337" + image.url;
  console.log(imageUrl);
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              {heading}
            </span>
          </h1>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
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

      {/* Hero cards sections */}
      <div className="z-10">
        <img src={imageUrl} alt={image.alternativeText} />
      </div>
    </section>
  );
}
