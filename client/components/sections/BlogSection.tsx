interface Blog {
  title: string;
  description: string;
  image: string;
}

interface BlogSectionProps {
  title?: string;
  blogs: Blog[];
}

export default function BlogSection({
  title = "Our Blogs",
  blogs,
}: BlogSectionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-white blog " id="blog">
      {/* Section Title */}
      <div className="max-w-6xl mx-auto" >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />
        {/* Blogs */}
        <div className="space-y-16">
          {blogs.map((blog, index) => (
            <div
              key={`${blog.title}-${index}`}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="w-full md:w-1/2">
                <h4 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                  {blog.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {blog.description}
                </p>
              </div>
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
