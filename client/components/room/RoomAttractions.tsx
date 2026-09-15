import { MapPin, Clock } from "lucide-react";

export interface Attraction {
  name: string;
  distance: string;
  travelTime: string;
  description: string;
}

interface Props {
  attractions: Attraction[];
  title?: string;
  sectionID?: string;
}

export const RoomAttractions = ({
  attractions,
  sectionID="attractions",
  title = "Nearby Attractions",
}: Props) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 gap-8">
          {attractions.map((attraction, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-primary mb-3">
                {attraction.name}
              </h3>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={18} className="text-accent" />

                <span>{attraction.distance}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Clock size={18} className="text-accent" />

                <span>{attraction.travelTime}</span>
              </div>

              <p className="text-gray-700">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};