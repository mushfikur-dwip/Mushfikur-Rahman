import React from "react";

const CVPreview = ({ cvData }) => {
  if (!cvData) return null;

  const {
    name,
    title,
    location,
    links,
    about,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = cvData;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-8 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{name}</h1>
        <p className="text-blue-700 text-lg">{title}</p>
        <p className="text-gray-600">{location}</p>
        <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm text-gray-600">
          {links?.email && <p>📧 {links.email}</p>}
          {links?.phone && <p>📞 {links.phone}</p>}
          {links?.portfolio && <p>🌐 {links.portfolio}</p>}
          {links?.github && <p>💻 {links.github}</p>}
          {links?.linkedin && <p>🔗 {links.linkedin}</p>}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
              <ul className="list-disc ml-5 text-gray-700">
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">Languages</h2>
              <ul className="list-disc ml-5 text-gray-700">
                {languages.map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {education && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
              <p className="text-gray-800">{education.degree}</p>
              <p className="text-sm text-gray-600">{education.institution}</p>
              <p className="text-sm text-gray-500">{education.year}</p>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">Certifications</h2>
              <ul className="list-disc ml-5 text-gray-700">
                {certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - spans 2 cols on md+ screens */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          {about && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">About</h2>
              <p className="text-gray-800">{about}</p>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
              {projects.map((proj, i) => (
                <div key={i} className="mb-4">
                  <p className="font-bold">{proj.name}</p>
                  <p className="text-sm text-gray-500 italic">{proj.techStack}</p>
                  <p>{proj.description}</p>
                  {proj.links?.demo && (
                    <a href={proj.links.demo} className="text-blue-600 underline text-sm" target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
              {experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <p className="font-bold">{exp.title} - {exp.company}</p>
                  <p className="text-sm text-gray-500 italic">{exp.location} | {exp.years}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVPreview;
