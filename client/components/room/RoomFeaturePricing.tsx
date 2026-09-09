import { Star } from "lucide-react";

interface RoomData {
  title: string;
  capacity: string;
  price: string;
  priceType: string;
  priceTypeNote?: string;
  sectionID?: string;
  features: string[];
  image: string;
  roomTypes: string[];
}


export const RoomFeaturesPricing = ({
  capacity,
  features,
  price,
  sectionID="features",
  priceType,
  roomTypes,
  image,
  priceTypeNote,
  title,
}: RoomData) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-primary/10 rounded-lg p-8 mb-8">
              <p className="mb-2">
                <span className="text-3xl font-bold text-accent">{price}</span>

                <span className="text-lg ml-2 text-gray-600 font-normal">
                  {priceType}
                  {priceTypeNote ? ` (${priceTypeNote})` : ""}
                </span>
              </p>

              <p className="text-gray-600">Maximum {capacity}</p>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4">
              Room Types Available
            </h3>

            <div className="flex flex-wrap gap-3 mb-8">
              {roomTypes.map((type, idx) => (
                <span
                  key={idx}
                  className="bg-accent/20 text-primary px-4 py-2 rounded-full font-medium"
                >
                  {type}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4">Features</h3>

            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-accent flex-shrink-0" />

                  <span className="text-gray-700 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {image && (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="rounded-lg shadow-lg w-full h-auto max-h-[28rem] object-contain bg-gray-100"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
