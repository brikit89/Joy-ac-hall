import { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import siteConfig from "@/data/site.json";
import MobileBookingBar from "./sections/MobileBookingbar";
import FloatingButtons from "./sections/FloatingButtons";
import Header from "./Header";

interface BlogLayoutProps {
  children: ReactNode;
}

export const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div>
      <Header {...siteConfig.blogHeader} />
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
