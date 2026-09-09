import { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import siteConfig from "@/data/site.json";
import MobileBookingBar from "./sections/MobileBookingbar";
import FloatingButtons from "./sections/FloatingButtons";
import Header from "./Header";

interface RoomLayoutProps {
  children: ReactNode;
}

export const RoomLayout = ({ children }: RoomLayoutProps) => {
  return (
    <div>
      <Header {...siteConfig.roomHeader} />
      {children}

      <SiteFooter {...siteConfig.footer} />
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
