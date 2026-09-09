import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  roomName: string;
  description: string;
  image: string;
  bookButtonText?: string;
  sectionID?: string;
  detailsButtonText?: string;
  onBookNow: () => void;
  onViewDetails: () => void;
}

export const RoomHero = ({
  roomName,
  description,
  image,
  bookButtonText,
  detailsButtonText,
  sectionID="home",
  onBookNow,
  onViewDetails,
}: Props) => {
  return (
    <section
      id={sectionID}
      className="relative h-screen sm:min-h-[70vh] md:h-screen overflow-hidden pt-24"
    >
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto w-full animate-fadeInUp flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight max-w-4xl">
            {roomName}
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl drop-shadow-md">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={onBookNow}
            >
              {bookButtonText}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/20 border-white text-white hover:bg-white/30"
              onClick={onViewDetails}
            >
              {detailsButtonText}
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 animate-pulse-slow">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>
    </section>
  );
};