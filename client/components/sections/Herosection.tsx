import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  sectionId?: string;
  video?: string;
  posterImage?: string;
  backgroundImage?: string;

  primaryButtonUrl: string;
  primaryButtonLabel?: string;

  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;

  showScrollIndicator?: boolean;
  overlay?: boolean;

  onExplore?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  sectionId = "hero",
  video,
  posterImage,

  primaryButtonUrl,
  primaryButtonLabel = "Check Group Rates",

  secondaryButtonLabel = "Explore Stay Options",
  secondaryButtonUrl = "#rooms",

  showScrollIndicator = true,

  onExplore,
}: HeroSectionProps) => {
  const [videoError, setVideoError] = useState(false);

  const handleExplore = () => {
    if (onExplore) {
      onExplore();
      return;
    }

    if (secondaryButtonUrl?.startsWith("#")) {
      document.getElementById(secondaryButtonUrl.substring(1))?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id={sectionId}
      className="relative h-screen sm:min-h-[70vh] md:h-screen overflow-hidden pt-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Video */}

        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage || undefined}
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full animate-fadeInUp flex flex-col items-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight max-w-4xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl drop-shadow-md">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary */}
            {primaryButtonUrl && (
              <a
                href={primaryButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {primaryButtonLabel}
                </Button>
              </a>
            )}

            {/* Secondary */}
            {secondaryButtonLabel && (
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white/30"
                onClick={handleExplore}
              >
                {secondaryButtonLabel}
              </Button>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();

              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="absolute bottom-8 animate-pulse-slow"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
