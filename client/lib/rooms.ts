import type { RoomData } from "@/components/RoomDetailContent";

/** Full room JSON shape used by detail pages + JSON-LD. */
export type RoomRecord = RoomData & {
  id: number;
  order?: number;
  slug: string;
  priceNumeric: number;
  occupancy: { value?: number; minValue?: number; maxValue?: number };
  amenityFeatures: string[];
  faqs?: { question: string; answer: string }[];
  image?: string;
};

const roomModules = import.meta.glob<{ default: RoomRecord }>(
  "@/data/rooms/*.json",
  { eager: true },
);

export const allRooms: RoomRecord[] = Object.values(roomModules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function getRoomBySlug(slug: string): RoomRecord | undefined {
  return allRooms.find((r) => r.slug === slug);
}

const SITE_URL = "https://joyachall.com";

function toAbsolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/** SEO meta for a room page — used by RoomPage and as prerender fallback. */
export function buildRoomMeta(room: RoomRecord) {
  const og =
    room.image ||
    room.sliderImages?.[0] ||
    "https://joyachall.com/logo-coloured.png";

  return {
    title: `${room.name} in Rameswaram | Joy AC Hall`,
    description: room.description,
    canonical: `${SITE_URL}/rooms/${room.slug}`,
    ogImage: toAbsolute(og),
    keywords: `${room.name}, Joy AC Hall, Rameswaram, AC rooms Rameswaram`,
  };
}
