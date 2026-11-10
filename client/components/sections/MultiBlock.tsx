
import React from "react";

interface CardData {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface MultiBlockProps {
  quote?: string;
  title: string;
  description: string;
  cardsData: CardData[];
}

interface CardBlockProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

function MultiBlock({
  quote,
  title,
  description,
  cardsData,
}: MultiBlockProps) {
  return (
    <section className="w-full bg-[#f1ede3] px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {quote && (
          <p className="mb-3 text-xs uppercase tracking-wider text-[#a58b65]">
            {quote}
          </p>
        )}

        <h2 className="mb-3 max-w-2xl text-2xl text-[#183b50] md:text-3xl">
          {title}
        </h2>

        <p className="mb-8 max-w-xl text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cardsData.map((data) => (
            <CardBlock
              key={data.id}
              title={data.title}
              description={data.description}
              icon={data.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function CardBlock({
  title,
  description,
  icon,
}: CardBlockProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-[#e9e3d8] bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {icon && (
        <div className="text-[#a58b65]">
          {icon}
        </div>
      )}

      <h3 className="text-base text-[#183b50]">
        {title}
      </h3>

      <p className="text-xs leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}

export { MultiBlock, CardBlock };
