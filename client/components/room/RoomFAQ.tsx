import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
  title?: string;
  sectionID?: string;
}

export const RoomFAQ = ({
  faqs,
  sectionID = "faq",
  title = "Frequently Asked Questions",
}: Props) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-gray-200 rounded-lg px-6 bg-white"
            >
              <AccordionTrigger className="text-lg font-semibold text-primary hover:text-primary/90">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-gray-700 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
