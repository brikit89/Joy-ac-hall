import React from 'react'



const Card = ({ title, description, buttonText, link, image }) => {
  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Add an image</div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/35 to-transparent" />
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-2xl font-semibold text-[#214f8e]">{title}</h3>
        <p className="mt-3 min-h-14 leading-7 text-slate-600">{description}</p>
        <a
          href={link}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#214f8e] px-5 py-3 font-medium text-white transition hover:bg-[#183d70] focus:outline-none focus:ring-2 focus:ring-[#dca923] focus:ring-offset-2"
        >
          {buttonText}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

const CardSection = ({
  title = 'Stay your way',
  description = 'Choose the stay that feels right for your visit.',
  cards ,
  gridColumns = 3,
}) => {
  const columns = Math.min(4, Math.max(1, Number(gridColumns) || 3))
  const gridClass = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[columns]

  return (
    <section className="bg-[#f7f8fa] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-[#214f8e] sm:text-5xl">{title}</h2>
          <span className="mx-auto mt-4 block h-1 w-24 rounded-full bg-[#dca923]" />
          <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>
        </header>
        <div className={`grid grid-cols-1 gap-7 sm:grid-cols-2 ${gridClass}`}>
          {cards.map((card, index) => <Card key={`${card.title}-${index}`} {...card} />)}
        </div>
      </div>
    </section>
  )
}

export { CardSection, Card}
