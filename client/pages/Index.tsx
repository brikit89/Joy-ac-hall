import React, { useEffect, useState } from "react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

import { GoogleReviews } from "@/components/GoogleReviews";

import faqsData from "@/data/faqs.json";
import attractionsData from "@/data/attractions.json";
import siteConfig from "@/data/site.json";
import routesMeta from "@/data/routesMeta.json";
import homepage from "@/data/homepage.json";

import HeroSection from "@/components/sections/Herosection";
import AboutSection from "@/components/sections/AboutSection";
import RoomsSection from "@/components/sections/RoomsSection";
import AmenitiesSection from "@/components/sections/AmenititesSection";
import AttractionsSection from "@/components/sections/AttractionSection";
import TrustSection from "@/components/sections/TrustSection";
import NearbyLandmarksSection from "@/components/sections/NearbyLandmarksSection";
import FAQSection from "@/components/sections/FAQSection";

import Header from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import RoomDetailsModal, {
  RoomDetails,
} from "@/components/sections/RoomDetailsModal";
import MobileBookingBar from "@/components/sections/MobileBookingbar";
import FloatingButtons from "@/components/sections/FloatingButtons";

// --------------------------------------------------
// Room data
// --------------------------------------------------

interface RoomCard {
  id: number;
  order: number;
  name: string;
  slug: string;

  sections?: Array<{ type: string; [key: string]: any }>;
  occupancy?: {
    minValue: number;
    maxValue: number;
  };
}

const roomModules = import.meta.glob<{
  default: Omit<RoomCard, "route">;
}>("@/data/rooms/*.json", {
  eager: true,
});

const cmsRooms: RoomCard[] = Object.values(roomModules)
  .map((m) => {
    const room = m.default;

    const featuresSection = room.sections?.find(
      (section: any) => section.type === "features",
    );

    const gallerySection = room.sections?.find(
      (section: any) => section.type === "gallery",
    );

    const heroSection = room.sections?.find(
      (section: any) => section.type === "hero",
    );

    return {
      id: room.id,
      order: room.order,
      name: room.name,
      slug: room.slug,

      capacity:
        featuresSection?.capacity ??
        (room.occupancy
          ? `${room.occupancy.minValue}–${room.occupancy.maxValue} persons`
          : ""),

      price: featuresSection?.price ?? "",

      priceType: featuresSection?.priceType ?? "",

      priceTypeNote: featuresSection?.priceTypeNote,

      features: featuresSection?.features ?? [],

      image:
        featuresSection?.image ??
        heroSection?.image ??
        gallerySection?.sliderImages?.[0] ??
        "",

      sliderImages: gallerySection?.sliderImages ?? [],

      sliderVideos: gallerySection?.sliderVideos ?? [],

      roomTypes: featuresSection?.roomTypes ?? [],

      route: `/rooms/${room.slug}`,
    };
  })
  .sort((a, b) => a.order - b.order);
// --------------------------------------------------
// Homepage section type
// --------------------------------------------------

interface HomepageSection {
  type: string;
  [key: string]: any;
}

// --------------------------------------------------
// Homepage
// --------------------------------------------------

const Index = () => {
  // ------------------------------------------------
  // Existing CMS data
  // ------------------------------------------------

  const rooms = cmsRooms;

  const attractions = attractionsData.items;

  const faqs = faqsData.items;

  // ------------------------------------------------
  // FAQ Schema
  // ------------------------------------------------

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,

      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  useDocumentMeta({
    ...routesMeta["/"],
    jsonLd: [faqSchema],
  });

  // ------------------------------------------------
  // Render CMS section
  // ------------------------------------------------

  const renderSection = (section: any, key: string) => {
    const { type, ...props } = section;

    switch (type) {
      case "hero":
        return <HeroSection key={key} {...props} />;

      case "about":
        return <AboutSection key={key} {...props} />;

      case "rooms":
        return (
          <RoomsSection
            onRoomSelect={setSelectedRoom}
            key={key}
            {...props}
            rooms={rooms}
          />
        );

      case "amenities":
        return <AmenitiesSection key={key} {...props} />;

      case "attractions":
        return (
          <AttractionsSection key={key} {...props} attractions={attractions} />
        );

      case "trust":
        return <TrustSection key={key} {...props} />;

      case "reviews":
        return <GoogleReviews key={key} {...props} />;

      case "landmarks":
        return <NearbyLandmarksSection key={key} {...props} />;

      case "faq":
        return <FAQSection key={key} {...props} faqs={faqs} />;

      default:
        console.warn("Unknown homepage section type:", type);
        return null;
    }
  };

  const [selectedRoom, setSelectedRoom] = useState<RoomDetails | null>(null);

  // ------------------------------------------------
  // PAGE
  // ------------------------------------------------

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      {/* Global Header */}

      <Header {...siteConfig.header} />

      {/* CMS Controlled Homepage */}

      <main>
        {(homepage.sections as HomepageSection[]).map((section, index) =>
          renderSection(section, `${section.type}-${index}`),
        )}
      </main>

      {/* Global Footer */}

      <SiteFooter {...siteConfig.footer} />
      <RoomDetailsModal
        room={selectedRoom}
        phoneUrl={siteConfig.phoneURL}
        whatsappUrl={siteConfig.whatsappURL}
        onClose={() => setSelectedRoom(null)}
      />
      <MobileBookingBar
        phoneUrl={siteConfig.phoneURL}
        whatsappUrl={siteConfig.whatsappURL}
      />
      <FloatingButtons
        phoneUrl={siteConfig.phoneURL}
        whatsappUrl={siteConfig.whatsappURL}
      />
    </div>
  );
};

export default Index;
