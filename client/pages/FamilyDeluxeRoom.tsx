import { RoomLayout } from "@/components/RoomLayout";
import {
  RoomDetailContent,
  type RoomData,
  type Attraction,
  type FaqItem,
} from "@/components/RoomDetailContent";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const room: RoomData = {
  name: "Family Deluxe Room",
  description:
    "Premium family deluxe room for up to 8 persons with attached bathroom. Perfect for families visiting Rameswaram with AC, hot water and all modern amenities.",
  capacity: "8 persons",
  price: "Rs. 3,600",
  priceType: "per room",
  features: [
    "AC / Non-AC available",
    "Attached bathroom",
    "Family comfort",
    "Hot water",
  ],
  sliderImages: [
    "/RoomsImage/FamilyDeluxeRoom/Family%20Deluxe%20hero%20banner.png",
    "/RoomsImage/FamilyDeluxeRoom/Duplex%20room%20bed%203.png",
    "/RoomsImage/FamilyDeluxeRoom/Duplex%20room%20bed%204.png",
    "/RoomsImage/FamilyDeluxeRoom/Duplex%20family%20room%20bathroom.png",
    "/RoomsImage/FamilyDeluxeRoom/Family%20room%20Heater.png",
    "/RoomsImage/FamilyDeluxeRoom/covered%20parking%20.png",
  ],
  sliderVideos: [
    "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2Fbf0bf71d75da4c7f921170e18da96927%2Fcompressed?apiKey=9ab187ea44d746dabf821e39227b5937&token=bf0bf71d75da4c7f921170e18da96927&alt=media&optimized=true",
    "https://cdn.builder.io/o/assets%2F9ab187ea44d746dabf821e39227b5937%2Fc5ed09529210485fa74fbb8528e046f9%2Fcompressed?apiKey=9ab187ea44d746dabf821e39227b5937&token=c5ed09529210485fa74fbb8528e046f9&alt=media&optimized=true",
  ],
  roomTypes: ["AC Family Room", "Non-AC Family Room"],
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
    question: "How many people can stay in a Family Deluxe Room?",
    answer:
      "The Family Deluxe Room can comfortably accommodate up to 8 persons.",
  },
  {
    question: "Does the room have an attached bathroom?",
    answer: "Yes, the Family Deluxe Room comes with a private attached bathroom.",
  },
  {
    question: "Are AC and Non-AC variants available?",
    answer:
      "Yes, both AC and Non-AC variants of the Family Deluxe Room are available.",
  },
  {
    question: "How far is the room from Ramanathaswamy Temple?",
    answer:
      "Just 8.4 km away, approximately 15–16 minutes by car from our property.",
  },
];

const FamilyDeluxeRoom = () => {
  useDocumentMeta({
    title:
      "Family Deluxe Room in Rameswaram (8 Persons) — Joy AC Hall & Rooms",
    description:
      "Spacious AC / Non-AC family deluxe room in Rameswaram for 8 persons with attached bathroom. ₹3,600 per room near Ramanathaswamy Temple, Pamban Bridge and Dr APJ Abdul Kalam Memorial.",
    canonical: "https://joyachall.com/rooms/family-deluxe-room",
    ogImage:
      "https://joyachall.com/RoomsImage/FamilyDeluxeRoom/Family%20Deluxe%20hero%20banner.png",
    keywords:
      "family room Rameswaram, deluxe room Rameswaram, 8 person family room near Ramanathaswamy Temple, family stay Rameswaram, AC family room Rameswaram",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        name: "Family Deluxe Room — Joy AC Hall & Rooms",
        description:
          "AC / Non-AC family deluxe room for up to 8 persons with attached bathroom. Ideal for families visiting Rameswaram.",
        url: "https://joyachall.com/rooms/family-deluxe-room",
        image:
          "https://joyachall.com/RoomsImage/FamilyDeluxeRoom/Family%20Deluxe%20hero%20banner.png",
        occupancy: { "@type": "QuantitativeValue", value: 8 },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "AC / Non-AC", value: true },
          { "@type": "LocationFeatureSpecification", name: "Attached Bathroom", value: true },
          { "@type": "LocationFeatureSpecification", name: "Hot Water", value: true },
          { "@type": "LocationFeatureSpecification", name: "Family Comfort", value: true },
        ],
        offers: {
          "@type": "Offer",
          price: "3600",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://joyachall.com/rooms/family-deluxe-room",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "3600",
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
            name: "Family Deluxe Room",
            item: "https://joyachall.com/rooms/family-deluxe-room",
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

export default FamilyDeluxeRoom;
