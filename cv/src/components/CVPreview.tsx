// import Image from "next/image";

export default function CVPreview({ data }) {
  return (
    <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-4xl mx-auto font-sans text-black">
      {/* Top Section: Name & Photo */}
      <div className="flex justify-between items-start border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-gray-600 text-lg">{data.title}</p>
          <p className="text-sm text-gray-500 mt-1">{data.location}</p>
          <div className="flex space-x-4 mt-3 text-blue-500">
            {data.links?.email && <a href={`mailto:${data.links.email}`}>📧</a>}
            {data.links?.phone && <a href={`tel:${data.links.phone}`}>📞</a>}
            {data.links?.github && <a href={data.links.github}>🐙</a>}
            {data.links?.linkedin && <a href={data.links.linkedin}>🔗</a>}
            {data.links?.twitter && <a href={data.links.twitter}>🐦</a>}
          </div>
        </div>
        <div>
          {/* <Image
            src={data.imageUrl || "/placeholder.jpg"}
            alt="Profile"
            width={90}
            height={90}
            className="rounded-full object-cover"
          /> */}
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-800 leading-relaxed">{data.about}</p>
      </div>

      {/* Work Experience Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <div className="space-y-4">
          {data.experience.map((job, idx) => (
            <div key={idx}>
              <div className="flex justify-between">
                <h3 className="font-bold">{job.title}</h3>
                <span className="text-sm text-gray-500">{job.years}</span>
              </div>
              <p className="text-sm text-gray-600">
                {job.company} · {job.location}
              </p>
              <p className="text-sm mt-1">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <div>
          <p className="font-medium">{data.education.degree}</p>
          <p className="text-sm text-gray-600">{data.education.institution}</p>
          <p className="text-sm text-gray-500">{data.education.year}</p>
        </div>
      </div>
    </div>
  );
}
