interface RoomForJsonLd {
  name: string;
  slug: string;
  priceNumeric: number;
  priceType: string;
  description: string;
  occupancy: { value?: number; minValue?: number; maxValue?: number };
  amenityFeatures: string[];
  sliderImages: string[];
}

const SITE_URL = "https://joyachall.com";

function toAbsolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

export function buildRoomJsonLd(room: RoomForJsonLd) {
  const url = `${SITE_URL}/rooms/${room.slug}`;
  const heroImage = toAbsolute(room.sliderImages[0]);
  const priceStr = String(room.priceNumeric);

  const occupancy =
    room.occupancy.value != null
      ? { "@type": "QuantitativeValue", value: room.occupancy.value }
      : {
          "@type": "QuantitativeValue",
          minValue: room.occupancy.minValue,
          maxValue: room.occupancy.maxValue,
        };

  return [
    {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      name: `${room.name} — Joy AC Hall & Rooms`,
      description: room.description,
      url,
      image: heroImage,
      occupancy,
      amenityFeature: room.amenityFeatures.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
      offers: {
        "@type": "Offer",
        price: priceStr,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: priceStr,
          priceCurrency: "INR",
          unitText: `${room.priceType} per night`,
        },
      },
    },
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
