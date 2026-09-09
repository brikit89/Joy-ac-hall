import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

export interface Amenity {
  icon: string;
  label: string;
}

interface Props {
  title?: string;
  sectionID?: string;
  amenities: Amenity[];
}

export const RoomAmenities = ({
  title = "Facilities & Amenities",
  amenities,
  sectionID = "amenities",
}: Props) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map(({ icon, label }, index) => {
            const Icon = Icons[icon as keyof typeof Icons] as LucideIcon;

            return (
              <div
                key={`${label}-${index}`}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                {Icon ? (
                  <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                ) : (
                  <div className="w-10 h-10 mx-auto mb-3" />
                )}

                <p className="font-medium">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
