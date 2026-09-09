import { Clock, MapPin } from "lucide-react";

export interface Attraction {
  name: string;
  image: string;
  distance: string;
  travelTime: string;
  visitorTime: string;
  description: string;
}

interface AttractionsSectionProps {
  attractions: Attraction[];
  title?: string;
  description?: string;
  sectionId?: string;
}

const AttractionsSection = ({
  attractions,
  sectionId="attractions",
  title = "Explore Rameswaram Island",
  description = "All major Rameswaram attractions are easily accessible from Joy AC Hall & Dormitory located on the National Highway.",
}: AttractionsSectionProps) => {
  return (
    <section id={sectionId} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />

        <p className="text-center text-gray-600 mb-4">
          {description}
        </p>

        <p className="text-center text-sm text-gray-500 mb-16">
          Distance, travel time, and visitor hours from our property
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="card-hover rounded-lg overflow-hidden shadow-md bg-white w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full max-w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {attraction.name}
                </h3>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">

                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-accent" />
                    <span>{attraction.distance}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-accent" />
                    <span>{attraction.travelTime}</span>
                  </div>

                </div>

                <p className="text-xs font-semibold text-accent mb-2">
                  Visitor Hours: {attraction.visitorTime}
                </p>

                <p className="text-gray-700 text-sm">
                  {attraction.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AttractionsSection;