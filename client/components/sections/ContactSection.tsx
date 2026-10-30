"use client";

import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Clock,
  Calendar,
  type LucideIcon,
} from "lucide-react";

interface ContactItem {
  title: string;
  icon: string;
  href?: string;
  description: string;
}

interface Props {
  title?: string;
  sectionID?: string;
  items: ContactItem[];
}

// Convert CMS icon string → Lucide React component
const iconMap: Record<string, LucideIcon> = {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Clock,
  Calendar,
};

export const ContactSection = ({
  title = "Book Your Stay",
  sectionID = "contact",
  items,
}: Props) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || MessageCircle;

            const isExternal =
              item.href.startsWith("http://") ||
              item.href.startsWith("https://");

            return (
              <a
                key={index}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="bg-white rounded-lg p-8 text-center shadow-lg
                           transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl
                           cursor-pointer block"
              >
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />

                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>

                <p className="text-accent font-semibold">
                  {item.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};