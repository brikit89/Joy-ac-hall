import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogButton {
  text: string;
  link: string;
}

interface BlogHeroProps {
  title: string;
  description: string;
  image: string;
  button?: BlogButton;
  sectionID?: string;
  onReadMore?: () => void;
}

export const BlogHero = ({
  title,
  description,
  image,
  button,
  sectionID = "blog-hero",
  onReadMore,
}: BlogHeroProps) => {
  return (
    <section
      id={sectionID}
      className="relative h-screen sm:min-h-[70vh] md:h-screen overflow-hidden pt-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full animate-fadeInUp flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight max-w-6xl">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-4xl drop-shadow-md">
            {description}
          </p>

          {button && (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={onReadMore}
            >
              {button.text}
            </Button>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-pulse-slow">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>
    </section>
  );
};