import { BlogLayout } from "@/components/BlogLayout";
import { ContactSection } from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";
import { tips } from "@/data/blogs/travel-tips.json";
import { contacts } from "@/data/blogs/contact.json";
import { faqs } from "@/data/blogs/faqs.json";
import { blogs } from "@/data/blogs/blogs.json";
import BlogDetailsSection from "@/components/blogs/BlogDetailsSections";
import { useParams } from "react-router-dom";
import { BlogHero } from "@/components/blogs/BlogHerosSection";
function BlogsPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const blog = blogs.find((boo) => boo.slug === slug);

  return (
    <BlogLayout>
      <BlogHero
        title={blog.title}
        description={blog.description}
        image={blog.imageThumbnail}
      />
      {blog?.sections?.map((section, index) => (
        <BlogDetailsSection
          position={section?.position as "left" | "right"}
          key={`${section.title}-${index}`}
          title={section.title}
          description={section.description}
          image={section.image}
          type={
            section.type as "image-description" | "image-description-highlights"
          }
          imageAlt={section.title}
          highlights={section.highlights}
          sectionId={`blog-section-${index}`}
        />
      ))}
      <FAQSection title="Travel Tips" sectionId="travel-tips" faqs={tips} />
      <ContactSection
        items={contacts}
        sectionID="contacts"
        title="Our Contacts"
      />
      <FAQSection faqs={faqs} />
    </BlogLayout>
  );
}

export default BlogsPage;
