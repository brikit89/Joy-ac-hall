import { Star } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Highlight {
  title: string;
  description: string;
}
interface AboutSectionProps {
  title: string;
  sectionId?: string;
  image: string;
  imageAlt?: string;
  description: string;
  highlights: Highlight[];
}

const AboutSection = ({
  title,
  image,
  sectionId="about",
  imageAlt = "About us",
  description,
  highlights,
}: AboutSectionProps) => {
  return (
    <section id={sectionId} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-in fade-in duration-1000">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="rounded-lg shadow-lg w-full max-w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div className="animate-in fade-in duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {title}
            </h2>

            <div className="w-20 h-1 bg-accent rounded-full mb-6" />

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              <ReactMarkdown>{description}</ReactMarkdown>
            </p>

            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-accent mt-1 flex-shrink-0" />

                  <p className="text-gray-700">
                    <strong>{highlight.title}</strong> - {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
