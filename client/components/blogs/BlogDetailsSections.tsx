import { Star } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface BlogDetailsProps {
  title: string;
  type: "image-description" | "image-description-highlights";
  description: string;
  image: string;
  imageAlt?: string;
  position?: "left" | "right";
  highlights?: {
    title: string;
    description: string;
  }[];
  sectionId?: string;
}

const BlogDetailsSection = ({
  title,
  type,
  description,
  image,
  imageAlt = "Blog image",
  highlights = [],
  position = "left",
  sectionId = "explore",
}: BlogDetailsProps) => {
  const hasHighlights =
    type === "image-description-highlights" && highlights.length > 0;

  return (
    <section id={sectionId} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <div
          className={`flex flex-col md:flex-row items-center gap-8 ${
            position === "left" ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2 animate-in fade-in duration-1000">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 animate-in fade-in duration-1000">
            <h2 className="text-3xl md:text-4xl  text-center font-bold text-primary mb-4">
              {title}
            </h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />


            <div className="text-gray-700 text-lg text-justify leading-relaxed">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          </div>
        </div>

        {hasHighlights && (
          <div className="space-y-3 mt-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <Star className="w-6 h-6 text-accent mt-1 flex-shrink-0" />

                <p className="text-gray-700">
                  <strong>{highlight.title}</strong> - {highlight.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetailsSection;
