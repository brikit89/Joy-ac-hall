import { RoomLayout } from "@/components/RoomLayout";
import {
  RoomDetailContent,
  type RoomData,
} from "@/components/RoomDetailContent";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import routesMeta from "@/data/routesMeta.json";
import roomData from "@/data/rooms/double-room.json";
import { roomPageAttractions } from "@/data/roomPageAttractions";
import { buildRoomJsonLd } from "@/lib/roomJsonLd";

const room: RoomData = roomData;

const DoubleRoom = () => {
  useDocumentMeta({
    ...routesMeta["/rooms/double-room"],
    jsonLd: buildRoomJsonLd(roomData),
  });

  return (
    <RoomLayout>
      <RoomDetailContent
        room={room}
        attractions={roomPageAttractions}
        faqs={roomData.faqs}
      />
    </RoomLayout>
  );
};

export default DoubleRoom;
