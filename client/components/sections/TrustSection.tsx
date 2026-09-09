import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
export interface TrustSignal {
  icon: string;
  title: string;
  description: string;
}

interface TrustSectionProps {
  items: TrustSignal[];
  title?: string;
  sectionId?: string;
}

const TrustSection = ({
  items,
  title = "Why Guests Choose Joy AC Hall & Rooms",
  sectionId,
}: TrustSectionProps) => {
  return (
    <section
      id={sectionId}
      className="py-20 px-4 bg-gradient-to-b from-primary/5 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((signal, index) => {
            const Icon = Icons[signal.icon as keyof typeof Icons] as LucideIcon;

            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center border border-gray-100"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="text-lg font-bold text-primary mb-2">
                  {signal.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {signal.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
