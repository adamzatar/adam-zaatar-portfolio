"use client";

export default function Skills() {
  const skillCategories = [
    {
      category: "Programming",
      skills: ["Java", "Python", "C", "Swift", "R", "Go", "Rust", "Kotlin", "Scala", "JavaScript", "TypeScript", "PHP", "HTML/CSS", "SQL"],
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Node.js", "Express.js", "Angular", "Vue", "Django", "Flask", "Spring Boot", "Laravel", "TailwindCSS", "Bootstrap", "Vapor", "Prisma", "shadcn/ui", "Framer Motion"],
    },
    {
      category: "Databases & Mobile",
      skills: ["SwiftUI", "UIKit", "Xcode", "React Native", "Flutter", "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Firestore", "SQLite", "Redis"],
    },
    {
      category: "Cloud & Machine Learning",
      skills: ["AWS (EC2, S3, SES)", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "scikit-learn", "TensorFlow", "PyTorch"],
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12">
          Skills
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          {skillCategories.map((cat, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                {cat.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}