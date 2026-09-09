import {
  Phone,
  MessageCircle,
} from "lucide-react";

interface Props {
  title?: string;
  sectionID?: string;
  phone: string;
  whatsappUrl: string;
}

export const RoomBooking = ({
  title = "Book Your Stay",
  phone,
  sectionID="contact",
  whatsappUrl,
}: Props) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />

            <h3 className="text-xl font-bold text-primary mb-2">
              Call Us
            </h3>

            <a
              href={`tel:${phone}`}
              className="text-accent hover:text-accent/80 font-semibold"
            >
              {phone}
            </a>
          </div>

          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />

            <h3 className="text-xl font-bold text-primary mb-2">
              WhatsApp
            </h3>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-semibold"
            >
              Message Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};