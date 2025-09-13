"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

type BlogPost = {
  title: string;
  description: string;
  date: string;
  slug: string;
};

const posts: BlogPost[] = [
  {
    title: "Designing Seamless Mobile Experiences",
    description:
      "A deep dive into building intuitive iOS interfaces that balance functionality with elegance.",
    date: "August 2025",
    slug: "designing-seamless-mobile-experiences",
  },
  {
    title: "Next.js 15 in Production",
    description:
      "Lessons learned deploying Next.js 15 applications at scale with TypeScript, Tailwind, and Vercel.",
    date: "July 2025",
    slug: "nextjs-15-in-production",
  },
  {
    title: "The Future of AI in Education",
    description:
      "Exploring how machine learning and generative AI will transform classrooms and learning tools.",
    date: "June 2025",
    slug: "future-of-ai-in-education",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-surface dark:bg-bg">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-text">Blog</h2>
          <p className="mt-4 text-lg text-muted">
            Writing at the intersection of technology, design, and research.
          </p>
        </motion.div>

        {/* Posts */}
        <div className="mt-12 space-y-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="pb-8 border-b border-border last:border-none group"
            >
              <h3 className="text-2xl font-semibold text-text transition-colors group-hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 text-muted">{post.description}</p>
              <span className="mt-2 block text-sm text-muted">{post.date}</span>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}