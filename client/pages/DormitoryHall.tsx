import { RoomLayout } from "@/components/RoomLayout";
import {
  RoomDetailContent,
  type RoomData,
  type Attraction,
  type FaqItem,
} from "@/components/RoomDetailContent";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const room: RoomData = {
  name: "Dormitory Hall",
  description:
    "Spacious AC dormitory hall accommodating 30–50 persons, ideal for pilgrimage groups, school tours and large travel parties. Comes with shared bathrooms, hot water, dining area and bus parking.",
  capacity: "30–50 persons",
  price: "Rs. 250",
  priceType: "per person",
  features: [
    "AC / Non-AC available",
    "4 Shared Bathrooms",
    "Best for pilgrimage groups",
    "Bus parking on-site",
  ],
  sliderImages: [
    "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fd10d1e1d85c1408c982f58841ec64b68",
    "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2F16885125ed994845879d07da56b0e6b5",
    "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Ff1ae1ed1b3ea4895bd238dcbbd942ef5",
  ],
  roomTypes: ["AC Dormitory", "Non-AC Dormitory"],
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
    question: "How many people can the Dormitory Hall accommodate?",
    answer:
      "The Dormitory Hall can comfortably accommodate 30–50 persons depending on group size.",
  },
  {
    question: "What amenities are included?",
    answer:
      "AC, 4 shared bathrooms, WiFi, hot water, dining area, and kitchen facilities for cooking.",
  },
  {
    question: "Is it suitable for pilgrimage groups?",
    answer:
      "Yes, the dormitory is ideal for pilgrimage groups, school tours, and large tourist groups.",
  },
  {
    question: "How far is the dormitory from Ramanathaswamy Temple?",
    answer:
      "Just 8.4 km away, approximately 15–16 minutes by car from our property.",
  },
];

const DormitoryHall = () => {
  useDocumentMeta({
    title:
      "AC Dormitory Hall in Rameswaram (30–50 Persons) — Joy AC Hall & Rooms",
    description:
      "Spacious AC dormitory hall in Rameswaram for 30–50 person pilgrimage groups, school tours and travel parties. ₹250 per person, 4 shared bathrooms, hot water, kitchen and bus parking near Ramanathaswamy Temple.",
    canonical: "https://joyachall.com/rooms/dormitory-hall",
    ogImage:
      "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fd10d1e1d85c1408c982f58841ec64b68?format=webp&width=1200",
    keywords:
      "dormitory in Rameswaram, AC dormitory Rameswaram, group stay near Ramanathaswamy Temple, school tour stay Rameswaram, pilgrimage dormitory hall Rameswaram",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        name: "Dormitory Hall — Joy AC Hall & Rooms",
        description:
          "AC dormitory hall accommodating 30–50 persons with 4 shared bathrooms. Best for pilgrimage groups, school tours and large travel parties visiting Rameswaram.",
        url: "https://joyachall.com/rooms/dormitory-hall",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2F9ab187ea44d746dabf821e39227b5937%2Fd10d1e1d85c1408c982f58841ec64b68",
        occupancy: { "@type": "QuantitativeValue", minValue: 30, maxValue: 50 },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "AC / Non-AC", value: true },
          { "@type": "LocationFeatureSpecification", name: "4 Shared Bathrooms", value: true },
          { "@type": "LocationFeatureSpecification", name: "Hot Water", value: true },
          { "@type": "LocationFeatureSpecification", name: "Bus Parking", value: true },
        ],
        offers: {
          "@type": "Offer",
          price: "250",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: "https://joyachall.com/rooms/dormitory-hall",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "250",
            priceCurrency: "INR",
            unitText: "per person per night",
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
            name: "Dormitory Hall",
            item: "https://joyachall.com/rooms/dormitory-hall",
          },
        ],
      },
    ],
  });

  return (
    <RoomLayout>
      <RoomDetailContent
        room={room}
        attractions={attractions}
        faqs={faqs}
        bookingTitle="Book Your Group Stay"
      />
    </RoomLayout>
  );
};

export default DormitoryHall;
