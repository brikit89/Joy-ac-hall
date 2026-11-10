
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
  buttonText = "View Room",
  sectionId = "rooms",
  title = "Accommodation Options",
  description = "Choose from budget-friendly dormitory rooms or comfortable family and double rooms near Ramanathaswamy Temple and Pamban Bridge.",
  onRoomSelect,
}: RoomsSectionProps) => {
  return (
    <section id={sectionId} className="bg-gray-100 px-4 py-20">
      <div className="mx-auto max-w-6xl">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
            {title}
          </h2>

          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-accent" />

          <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            {description}
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">

          {rooms.map((room) => (
            <div
              key={room.id}
              className="card-hover flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md"
            >
              {/* Room Image */}
              <div className="h-55 w-full shrink-0 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  decoding="async"
                  className="h-45 w-full object-cover border rounded-xl transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Room Content */}
              <div className="flex flex-1 flex-col p-6">

                {/* Room Details */}
                <div>
                  <h3 className="mb-2 text-xl font-bold text-primary md:text-2xl">
                    {room.name}
                  </h3>

                  <p className="mb-4 text-sm font-medium text-gray-600">
                    {room.capacity}
                  </p>

                  {/* Price */}
                  <div className="mb-5 flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl font-bold text-accent">
                      {room.price}
                    </span>

                    <span className="text-sm text-gray-600">
                      {room.priceType}
                      {room.priceTypeNote
                        ? ` (${room.priceTypeNote})`
                        : ""}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {room.features.map((feature, index) => (
                      <li
                        key={`${room.id}-${index}`}
                        className="flex items-start gap-3 text-sm leading-6 text-gray-700"
                      >
                        <span className="shrink-0 font-bold text-accent">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-6">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Link
                      to={room.route}
                      onClick={() => onRoomSelect?.(room.id)}
                    >
                      {buttonText}
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
