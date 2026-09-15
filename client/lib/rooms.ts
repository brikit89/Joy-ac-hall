import type { RoomData } from "@/components/RoomDetailContent";

/**
 * Full room JSON shape used by detail pages.
 */
export type RoomRecord = RoomData;

const roomModules = import.meta.glob<{ default: RoomRecord }>(
  "@/data/rooms/*.json",
  { eager: true },
);

export const allRooms: RoomRecord[] = Object.values(roomModules)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export function getRoomBySlug(slug: string): RoomRecord | undefined {
  return allRooms.find((room) => room.slug === slug);
}

const SITE_URL = "https://joyachall.com";

function toAbsolute(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/**
 * Find a particular section from a room.
 */
function getSection<T extends { type: string }>(
  room: RoomRecord,
  type: T["type"],
): T | undefined {
  return room.sections.find((section) => section.type === type) as unknown as
    | T
    | undefined;
}

/**
 * SEO meta for a room page.
 */
export function buildRoomMeta(room: RoomRecord) {
  const hero = getSection<{
    type: "hero";
    description: string;
    image?: string;
  }>(room, "hero");

  const gallery = getSection<{
    type: "gallery";
    sliderImages?: string[];
  }>(room, "gallery");

  const og = hero?.image || gallery?.sliderImages?.[0] || "/logo-coloured.png";

  return {
    title: `${room.name} in Rameswaram | Joy AC Hall`,

    description:
      hero?.description || `${room.name} at Joy AC Hall, Rameswaram.`,

    canonical: `${SITE_URL}/rooms/${room.slug}`,

    ogImage: toAbsolute(og),

    keywords: `${room.name}, Joy AC Hall, Rameswaram, AC rooms Rameswaram`,
  };
}
