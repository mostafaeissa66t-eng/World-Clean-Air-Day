import React from "react";
import { useParams, Link } from "react-router-dom";
import projects from "../data/projects.json";
import Header from "./Header"; // It's good practice to include shared components
import Footer from "./Footer";

function ProjectPage({ language, onLanguageChange }) {
  // Get the 'slug' from the URL (e.g., 'super-high-voltage')
  const { slug } = useParams();

  // Find the project data that matches the slug
  const project = projects.find((p) => p.slug === slug);

  // If no project is found for the given slug, show an error message
  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Project Not Found!</h1>
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          &larr; {language === "ar" ? "العودة إلى الرئيسية" : "Back to Home"}
        </Link>
      </div>
    );
  }

  // Select the correct language content
  const content = project[language];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        {/* Back to Home link */}
        <Link
          to="/"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          &larr; {language === "ar" ? "العودة إلى الرئيسية" : "Back to Home"}
        </Link>

        {/* Project Title */}
        <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
          {content.title}
        </h1>

        {/* Long Description */}
        <p className="text-xl text-gray-700 mb-12 max-w-4xl leading-relaxed">
          {content.long_description}
        </p>

        {/* Image Gallery Title */}
        <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2">
          {language === "ar" ? "معرض الصور" : "Image Gallery"}
        </h2>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={image}
                alt={`${content.title} - Image ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
