import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface Room {
  id: number;
  name: string;
  capacity: string;
  price: string;
  priceType: string;
  priceTypeNote?: string;
  features: string[];
  image: string;
  route: string;
}

interface RoomsSectionProps {
  rooms: Room[];
  title?: string;
  buttonText?: string;
  sectionId?: string;
  description?: string;
  onRoomSelect?: (roomId: number) => void;
}


const RoomsSection = ({
  rooms,
  buttonText,
  sectionId="rooms",
  title = "Accommodation Options",
  description = "Choose from budget-friendly dormitory rooms or comfortable family and double rooms near Ramanathaswamy Temple and Pamban Bridge.",
  onRoomSelect,
}: RoomsSectionProps) => {
  return (
    <section id={sectionId} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />

        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="card-hover rounded-lg overflow-hidden shadow-md border border-gray-100 bg-white"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full max-w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {room.name}
                </h3>

                <p className="text-gray-600 font-medium text-sm mb-3">
                  {room.capacity}
                </p>

                <p className="mb-4">
                  <span className="text-2xl font-bold text-accent">
                    {room.price}
                  </span>{" "}
                  <span className="text-sm font-normal text-gray-600">
                    {room.priceType}
                    {room.priceTypeNote
                      ? ` (${room.priceTypeNote})`
                      : ""}
                  </span>
                </p>

                <ul className="space-y-2 mb-6">
                  {room.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-accent">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to={room.route} className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {buttonText}
                  </Button>
                </Link>

                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;