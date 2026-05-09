import { RoomLayout } from "@/components/RoomLayout";
import {
  RoomDetailContent,
  type RoomData,
  type Attraction,
  type FaqItem,
} from "@/components/RoomDetailContent";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const room: RoomData = {
  name: "Double Room",
  description:
    "Comfortable AC / Non-AC double room for up to 4 persons. Ideal for couples and small families with electric kettle, wardrobe and hot water.",
  capacity: "4 persons",
  price: "Rs. 2,000",
  priceType: "per room",
  features: [
    "AC / Non-AC available",
    "Electric kettle",
    "Wardrobe",
    "Hot water",
  ],
  sliderImages: [
    "/RoomsImage/DoubleRoom/Double%20room%20Hero%20banner.png",
    "/RoomsImage/DoubleRoom/Double%20room%20ac.png",
    "/RoomsImage/DoubleRoom/Double%20room%20bed%202%20.png",
    "/RoomsImage/DoubleRoom/double%20room%20bathroom.png",
    "/RoomsImage/DoubleRoom/Heater%20%20in%20Bathroom.jpg.jpeg",
    "/RoomsImage/DoubleRoom/covered%20parking%20.png",
  ],
  sliderVideos: [
    "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2F7443dbf4ae5649ec834da0899d60ae16%2Fcompressed?apiKey=9ab187ea44d746dabf821e39227b5937&token=7443dbf4ae5649ec834da0899d60ae16&alt=media&optimized=true",
  ],
  roomTypes: ["AC Double Room", "Non-AC Double Room"],
};

const attractions: Attraction[] = [
  {
    name: "Ramanathaswamy Temple",
    distance: "8.4 km",
    travelTime: "15–16 min drive",
    description: "One of the 12 Jyotirlingas of India",
  },
  {
    name: "Pamban Bridge",
    distance: "5.7 km",
    travelTime: "10 min drive",
    description: "Historic railway bridge connecting Rameswaram to mainland",
  },
  {
    name: "Dr APJ Abdul Kalam Memorial",
    distance: "2.8 km",
    travelTime: "6 min drive",
    description: "Memorial dedicated to India's former President",
  },
  {
    name: "Dhanushkodi Beach",
    distance: "19 km",
    travelTime: "35 min drive",
    description: "Beautiful beach at the southern tip of India",
  },
];

const faqs: FaqItem[] = [
  {
    question: "How many people can stay in a Double Room?",
    answer: "The Double Room can comfortably accommodate up to 4 persons.",
  },
  {
    question: "What amenities are included in the room?",
    answer:
      "AC, electric kettle, wardrobe, WiFi, hot water and comfortable bedding.",
  },
  {
    question: "Is breakfast included?",
    answer:
      "Breakfast is not included, but we have a dining area available for guests.",
  },
  {
    question: "How far is the room from Ramanathaswamy Temple?",
    answer:
      "Just 8.4 km away, approximately 15–16 minutes by car from our property.",
  },
];

const DoubleRoom = () => {
  useDocumentMeta({
    title: "AC Double Room in Rameswaram (4 Persons) — Joy AC Hall & Rooms",
    description:
      "Comfortable AC / Non-AC double room in Rameswaram for 4 persons. ₹2,000 per room with electric kettle, wardrobe and hot water. Near Ramanathaswamy Temple, Pamban Bridge and Dr APJ Abdul Kalam Memorial.",
    canonical: "https://joyachall.com/rooms/double-room",
    ogImage:
      "https://joyachall.com/RoomsImage/DoubleRoom/Double%20room%20Hero%20banner.png",
    keywords:
      "double room Rameswaram, AC double room near Ramanathaswamy Temple, 4 person room Rameswaram, budget room Rameswaram",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        name: "Double Room — Joy AC Hall & Rooms",
        description:
          "AC / Non-AC double room for up to 4 persons with electric kettle, wardrobe and hot water. Located on the National Highway in Rameswaram.",
        url: "https://joyachall.com/rooms/double-room",
        image:
          "https://joyachall.com/RoomsImage/DoubleRoom/Double%20room%20Hero%20banner.png",
        occupancy: { "@type": "QuantitativeValue", value: 4 },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "AC / Non-AC", value: true },
          { "@type": "LocationFeatureSpecification", name: "Electric Kettle", value: true },
          { "@type": "LocationFeatureSpecification", name: "Wardrobe", value: true },
          { "@type": "LocationFeatureSpecification", name: "Hot Water", value: true },
        ],
        offers: {
          "@type": "Offer",
          price: "2000",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://joyachall.com/rooms/double-room",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "2000",
            priceCurrency: "INR",
            unitText: "per room per night",
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://joyachall.com/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Double Room",
            item: "https://joyachall.com/rooms/double-room",
          },
        ],
      },
    ],
  });

  return (
    <RoomLayout>
      <RoomDetailContent room={room} attractions={attractions} faqs={faqs} />
    </RoomLayout>
  );
};

export default DoubleRoom;
