import {
  MessageCircle,
  Phone as PhoneIcon,
} from "lucide-react";

interface FloatingButtonsProps {
  phoneUrl: string;
  whatsappUrl: string;
}

const FloatingButtons = ({
  phoneUrl,
  whatsappUrl,
}: FloatingButtonsProps) => {
  return (
    <div className="fixed bottom-8 right-4 flex flex-col gap-4 hidden lg:flex z-40">

      {/* Call */}
      <a
        href={phoneUrl}
        className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Call"
      >
        <PhoneIcon size={20} />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle size={20} />
      </a>

    </div>
  );
};

export default FloatingButtons;