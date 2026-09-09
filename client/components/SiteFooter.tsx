import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";
import siteConfig from "@/data/site.json";

interface QuickLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SocialLink {
  platform: "Facebook" | "Instagram" | "YouTube";
  url: string;
}

interface FooterData {
  aboutTitle: string;
  aboutText: string;
  quickLinksTitle: string;
  quickLinks: QuickLink[];
  socialTitle: string;
  socialLinks: SocialLink[];
  mapTitle: string;
  mapEmbedUrl: string;
  copyrightText: string;
}

const socialIcons = {
  Facebook,
  Instagram,
  YouTube: Youtube,
};

export const SiteFooter = ({
  aboutTitle,
  aboutText,
  quickLinksTitle,
  quickLinks,
  socialTitle,
  socialLinks,
  mapTitle,
  mapEmbedUrl,
  copyrightText,
}) => {
  return (
    <footer className="bg-primary text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h4 className="text-xl font-bold mb-4">{aboutTitle}</h4>

            <p className="text-gray-200">{aboutText}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">{quickLinksTitle}</h4>

            <ul className="space-y-2 text-gray-200">
              {quickLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                  
                        document.getElementById(link.href)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">{socialTitle}</h4>

            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];

                // Don't show empty social links
                if (!social.url || !Icon) {
                  return null;
                }

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Google Maps */}
        {mapEmbedUrl && (
          <div className="mt-12 pt-8 border-t border-white/20">
            <h4 className="text-xl font-bold mb-6 text-center">{mapTitle}</h4>

            <div className="w-full max-w-2xl mx-auto aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden">
              <iframe
                title="Joy AC Hall & Rooms — Google Maps location"
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 mt-8 text-center text-gray-200">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};
