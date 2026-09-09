import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
export interface Amenity {
  icon: string;
  label: string;
}

interface AmenitiesSectionProps {
  title?: string;
  description?: string;
  sectionId?: string;
  amenities: Amenity[];
}

const AmenitiesSection = ({
  title = "Facilities & Amenities",
  sectionId = "amenities",
  description = "Our dormitory and rooms are equipped with essential amenities to ensure a comfortable stay near Ramanathaswamy Temple.",
  amenities,
}: AmenitiesSectionProps) => {
  return (
    <section id={sectionId} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />

        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {amenities.map((amenity, index) => {
            const Icon = Icons[
              amenity.icon as keyof typeof Icons
            ] as LucideIcon;

            return (
              <div
                key={index}
                className="group bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <div className="flex justify-center mb-3">
                  {Icon ? (
                    <Icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                  ) : (
                    <Icons.CircleHelp className="w-10 h-10 text-primary" />
                  )}
                </div>

                <p className="text-gray-700 font-medium">{amenity.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
