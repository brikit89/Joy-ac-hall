import type {
  RoomData,
  FeaturesSection,
  AmenitiesSection,
  HeroSection,
  GallerySection,
} from "@/components/RoomDetailContent";

const SITE_URL = "https://joyachall.com";

function toAbsolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

function getSection<T extends { type: string }>(
  room: RoomData,
  type: T["type"],
): T | undefined {
  return room.sections.find((section) => section.type === type) as unknown as
    | T
    | undefined;
}

export function buildRoomJsonLd(room: RoomData) {
  const url = `${SITE_URL}/rooms/${room.slug}`;

  const hero = getSection<HeroSection>(room, "hero");
  const gallery = getSection<GallerySection>(room, "gallery");
  const features = getSection<FeaturesSection>(room, "features");
  const amenities = getSection<AmenitiesSection>(room, "amenities");

  // Prefer hero image, then first gallery image.
  const image = hero?.image || gallery?.sliderImages?.[0] || "";

  const heroImage = image ? toAbsolute(image) : `${SITE_URL}/logo-coloured.png`;

  const description =
    hero?.description || `${room.name} at Joy AC Hall & Rooms.`;

  const priceStr =
    features?.priceNumeric != null ? String(features.priceNumeric) : undefined;

  const occupancy =
    room.occupancy.value != null
      ? {
          "@type": "QuantitativeValue",
          value: room.occupancy.value,
        }
      : {
          "@type": "QuantitativeValue",
          minValue: room.occupancy.minValue,
          maxValue: room.occupancy.maxValue,
        };

  const amenityFeatures = amenities?.amenityFeatures ?? [];

  const accommodation: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Accommodation",

    name: `${room.name} — Joy AC Hall & Rooms`,

    description,

    url,

    image: heroImage,

    occupancy,

    amenityFeature: amenityFeatures.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };

  // Only add Offer when pricing information exists.
  if (features && priceStr) {
    accommodation.offers = {
      "@type": "Offer",
      price: priceStr,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,

      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: priceStr,
        priceCurrency: "INR",
        unitText: `${features.priceType} per night`,
      },
    };
  }

  return [
    accommodation,

    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: room.name,
          item: url,
        },
      ],
    },
  ];
}
