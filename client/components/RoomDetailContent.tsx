import { Fragment } from "react";
import { GoogleReviews } from "@/components/GoogleReviews";

import { Attraction, RoomAttractions } from "./room/RoomAttractions";
import { FaqItem, RoomFAQ } from "./room/RoomFAQ";
import { RoomHero } from "./room/RoomHero";
import { RoomGallery } from "./room/RoomGallery";
import { RoomFeaturesPricing } from "./room/RoomFeaturePricing";
import { Amenity, RoomAmenities } from "./room/RoomAmenities";
import { RoomBooking } from "./room/RoomBooking";

export interface HeroSection {
  type: "hero";
  roomName: string;
  description: string;
  image: string;
  bookButtonText?: string;
  sectionId?: string;
  detailsButtonText?: string;
}

export interface GallerySection {
  type: "gallery";
  title?: string;
  sliderImages: string[];
  sectionId?: string;
  sliderVideos?: string[];
}

export interface FeaturesSection {
  type: "features";
  title?: string;
  price: string;
  priceNumeric: number;
  priceType: string;
  priceTypeNote?: string;
  capacity: string;
  roomTypes: string[];
  features: string[];
  image?: string;
  sectionId?: string;
}

export interface AmenitiesSection {
  type: "amenities";
  title?: string;
  amenities: Amenity[];
  amenityFeatures?: string[];
  sectionId?: string;
}

export interface AttractionsSection {
  type: "attractions";
  title?: string;
  attractions: Attraction[];
  sectionId?: string;
}

export interface FAQSection {
  type: "faq";
  title?: string;
  faqs: FaqItem[];
  sectionId?: string;
}

export interface ReviewsSection {
  type: "reviews";
  background: "gray" | "white";
  subtitle: string;
  title: string;
  sectionId?: string;
}

export interface BookingSection {
  type: "booking";
  title?: string;
  phone: string;
  whatsappUrl: string;
  sectionId?: string;
}

// ─────────────────────────────────────────────
// Union
// ─────────────────────────────────────────────

export type RoomSection =
  | HeroSection
  | GallerySection
  | FeaturesSection
  | AmenitiesSection
  | AttractionsSection
  | FAQSection
  | ReviewsSection
  | BookingSection;

export interface RoomData {
  id: number;
  order: number;
  name: string;
  slug: string;

  occupancy: {
    value?: number;
    minValue?: number;
    maxValue?: number;
  };

  sections: RoomSection[];
}

interface Props {
  room: RoomData;
}

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
  });
};

const renderSection = (section: RoomSection, room: RoomData) => {
  switch (section.type) {
    case "hero":
      return (
        <RoomHero
          roomName={section.roomName}
          description={section.description}
          image={section.image}
          bookButtonText={section.bookButtonText}
          detailsButtonText={section.detailsButtonText}
          onBookNow={() => scrollToSection("contact")}
          onViewDetails={() => scrollToSection("features")}
        />
      );

    case "gallery":
      return (
        <RoomGallery
          title={room.name}
          images={section.sliderImages}
          videos={section.sliderVideos}
        />
      );

    case "features":
      return (
        <RoomFeaturesPricing
          title={section.title}
          capacity={section.capacity}
          price={section.price}
          priceType={section.priceType}
          priceTypeNote={section.priceTypeNote}
          features={section.features}
          image={section.image}
          roomTypes={section.roomTypes}
        />
      );

    case "amenities":
      return (
        <RoomAmenities title={section.title} amenities={section.amenities} />
      );

    case "attractions":
      return <RoomAttractions attractions={section.attractions} />;

    case "faq":
      return <RoomFAQ faqs={section.faqs} />;

    case "reviews":
      return <GoogleReviews background="gray" />;

    case "booking":
      return (
        <RoomBooking
          title={section.title}
          phone={section.phone}
          whatsappUrl={section.whatsappUrl}
        />
      );

    default:
      return null;
  }
};

export const RoomDetailContent = ({ room }: Props) => {
  return (
    <>
      {room.sections.map((section, index) => (
        <Fragment key={`${section.type}-${index}`}>
          {renderSection(section, room)}
        </Fragment>
      ))}
    </>
  );
};
