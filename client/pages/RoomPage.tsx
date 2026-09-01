import { Navigate, useParams } from "react-router-dom";
import { RoomLayout } from "@/components/RoomLayout";
import { RoomDetailContent } from "@/components/RoomDetailContent";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import routesMeta from "@/data/routesMeta.json";
import { roomPageAttractions } from "@/data/roomPageAttractions";
import { buildRoomJsonLd } from "@/lib/roomJsonLd";
import { buildRoomMeta, getRoomBySlug } from "@/lib/rooms";

const RoomPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const room = getRoomBySlug(slug);

  const path = `/rooms/${slug}`;
  const meta =
    (routesMeta as Record<string, ReturnType<typeof buildRoomMeta>>)[path] ??
    (room ? buildRoomMeta(room) : null);

  useDocumentMeta(
    room && meta
      ? { ...meta, jsonLd: buildRoomJsonLd(room) }
      : {
          title: "Room not found | Joy AC Hall",
          description: "This room could not be found.",
          canonical: `https://joyachall.com${path}`,
        },
  );

  if (!room) {
    return <Navigate to="/" replace />;
  }

  return (
    <RoomLayout>
      <RoomDetailContent
        room={room}
        attractions={roomPageAttractions}
        faqs={room.faqs}
      />
    </RoomLayout>
  );
};

export default RoomPage;
