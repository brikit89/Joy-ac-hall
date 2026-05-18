import { useState } from "react";
import {
  ChevronDown,
  Star,
  Wifi,
  Wind,
  Droplets,
  Shield,
  ParkingSquare,
  Thermometer,
  UtensilsCrossed,
  Coffee,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleReviews } from "@/components/GoogleReviews";

export interface RoomData {
  name: string;
  description: string;
  capacity: string;
  price: string;
  priceType: string;
  priceTypeNote?: string;
  features: string[];
  sliderImages: string[];
  sliderVideos?: string[];
  roomTypes: string[];
}

export interface Attraction {
  name: string;
  distance: string;
  travelTime: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  room: RoomData;
  attractions: Attraction[];
  faqs: FaqItem[];
  bookingTitle?: string;
}

const amenities = [
  { Icon: Wifi, label: "WiFi" },
  { Icon: Wind, label: "AC Rooms" },
  { Icon: Droplets, label: "RO Water" },
  { Icon: Shield, label: "24/7 Security" },
  { Icon: ParkingSquare, label: "Free Parking" },
  { Icon: Thermometer, label: "Hot Water" },
  { Icon: UtensilsCrossed, label: "Dining Area" },
  { Icon: Coffee, label: "Kitchen Space" },
];

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

export const RoomDetailContent = ({
  room,
  attractions,
  faqs,
  bookingTitle = "Book Your Stay",
}: Props) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const totalMedia =
    room.sliderImages.length + (room.sliderVideos?.length || 0);
  const isVideo = currentMediaIndex >= room.sliderImages.length;
  const mediaIndex = isVideo
    ? currentMediaIndex - room.sliderImages.length
    : currentMediaIndex;

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen sm:min-h-[70vh] md:h-screen overflow-hidden pt-24"
      >
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20"
            style={{
              backgroundImage: `url('${room.sliderImages[0]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/50" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full animate-fadeInUp flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight max-w-4xl">
              {room.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl drop-shadow-md">
              {room.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => scrollToSection("contact")}
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white/30"
                onClick={() => scrollToSection("features")}
              >
                View Details
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 animate-pulse-slow">
            <ChevronDown className="w-8 h-8 text-white" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Room Gallery
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="relative aspect-[4/3] w-full max-w-3xl mx-auto flex items-center justify-center group rounded-lg overflow-hidden">
            {isVideo && room.sliderVideos ? (
              <video
                key={`v-${mediaIndex}`}
                src={room.sliderVideos[mediaIndex]}
                controls
                className="w-full h-full max-w-full object-cover"
              />
            ) : (
              <img
                src={room.sliderImages[mediaIndex]}
                alt={`${room.name} - Image ${mediaIndex + 1}`}
                className="w-full h-full max-w-full object-cover"
              />
            )}

            <button
              onClick={() =>
                setCurrentMediaIndex((prev) =>
                  prev === 0 ? totalMedia - 1 : prev - 1,
                )
              }
              className="absolute left-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
              aria-label="Previous media"
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() =>
                setCurrentMediaIndex((prev) =>
                  prev === totalMedia - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
              aria-label="Next media"
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentMediaIndex + 1} / {totalMedia}
            </div>
          </div>
        </div>
      </section>

      {/* Features & Pricing */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Room Features & Pricing
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-primary/10 rounded-lg p-8 mb-8">
                <p className="mb-2">
                  <span className="text-3xl font-bold text-accent">
                    {room.price}
                  </span>
                  <span className="text-lg ml-2 text-gray-600 font-normal">
                    {room.priceType}
                    {room.priceTypeNote ? ` (${room.priceTypeNote})` : ""}
                  </span>
                </p>
                <p className="text-gray-600">Maximum {room.capacity}</p>
              </div>

              <h3 className="text-2xl font-bold text-primary mb-4">
                Room Types Available
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {room.roomTypes.map((type, idx) => (
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
                {room.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <img
                src={room.sliderImages[0]}
                alt={room.name}
                loading="lazy"
                decoding="async"
                className="rounded-lg shadow-lg w-full h-auto max-h-[28rem] object-contain bg-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Facilities & Amenities
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map(({ Icon, label }) => (
              <div
                key={label}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section id="attractions" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Nearby Attractions
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
                <p className="text-gray-700">{attraction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews background="gray" />

      {/* Contact / Booking */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            {bookingTitle}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">Call Us</h3>
              <a
                href="tel:+918122445538"
                className="text-accent hover:text-accent/80 font-semibold"
              >
                +91 81224 45538
              </a>
            </div>

            <div className="bg-white rounded-lg p-8 text-center shadow-lg">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/918122445538"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 font-semibold"
              >
                Message Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
