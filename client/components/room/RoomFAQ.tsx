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
  sectionID="faq",
  title = "Frequently Asked Questions",
}: Props) => {
  return (
    <section id={sectionID} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h3 className="font-bold text-lg text-primary mb-2">
                {faq.question}
              </h3>

              <p className="text-gray-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};