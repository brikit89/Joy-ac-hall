import { useEffect, useState } from "react";
import {
  MessageCircle,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RoomDetails {
  id: number;
  name: string;
  capacity: string;
  price: string;
  priceType: string;
  features: string[];
  roomTypes: string[];
  sliderImages: string[];
  sliderVideos?: string[];
}

interface RoomDetailsModalProps {
  room: RoomDetails | null;
  phoneUrl: string;
  whatsappUrl: string;
  onClose: () => void;
}

const RoomDetailsModal = ({
  room,
  phoneUrl,
  whatsappUrl,
  onClose,
}: RoomDetailsModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [room]);

  if (!room) return null;

  const images = room.sliderImages || [];
  const videos = room.sliderVideos || [];

  const totalMedia = images.length + videos.length;

  const isVideo = currentMediaIndex >= images.length;

  const mediaIndex = isVideo
    ? currentMediaIndex - images.length
    : currentMediaIndex;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === totalMedia - 1 ? 0 : prev + 1,
    );
  };

  const previousMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? totalMedia - 1 : prev - 1,
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >

        {/* Media */}
        <div className="relative bg-gray-200 h-96 flex items-center justify-center">

          {isVideo ? (
            <video
              src={videos[mediaIndex]}
              controls
              className="w-full h-full max-w-full object-contain"
            />
          ) : (
            <img
              src={images[mediaIndex]}
              alt={`${room.name} - Image ${mediaIndex + 1}`}
              className="w-full h-full max-w-full object-contain"
            />
          )}

          {/* Previous */}
          {totalMedia > 1 && (
            <button
              onClick={previousMedia}
              className="absolute left-4 bg-white/80 hover:bg-white p-2 rounded-full"
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
          )}

          {/* Next */}
          {totalMedia > 1 && (
            <button
              onClick={nextMedia}
              className="absolute right-4 bg-white/80 hover:bg-white p-2 rounded-full"
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
                  d="M9 5l7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Counter */}
          {totalMedia > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentMediaIndex + 1} / {totalMedia}
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Details */}
        <div className="p-8">

          <h2 className="text-4xl font-bold text-primary mb-2">
            {room.name}
          </h2>

          <p className="text-gray-600 mb-6">
            {room.capacity}
          </p>

          {/* Price */}
          <div className="bg-primary/10 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2">
              Starting Price:
            </p>

            <p className="text-3xl font-bold text-primary">
              {room.price}

              <span className="text-lg ml-2 text-gray-600 font-normal">
                {room.priceType}
              </span>
            </p>
          </div>

          {/* Room Types */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">
              Available Room Types
            </h3>

            <div className="flex flex-wrap gap-2">
              {room.roomTypes.map((type, index) => (
                <span
                  key={index}
                  className="bg-accent/20 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-3">
              Features
            </h3>

            <ul className="space-y-2">
              {room.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />

                  <span className="text-gray-700">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">

            <a href={phoneUrl} className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
                <MessageCircle size={18} />
                WhatsApp
              </Button>
            </a>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomDetailsModal;