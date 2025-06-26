import React from "react";

export default function InputForm({ userInput, setUserInput, onGenerate, loading }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <label className="block mb-2 font-semibold text-gray-700 text-lg">
                ✍️ Write About Yourself
            </label>
            <p>name,
                title,
                location,
                links,
                about,
                experience,
                education,
                skills,
                projects,
                certifications,
                languages</p>
            <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                placeholder="Write your background, experience, skills, and career story..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            ></textarea>

            <button
                onClick={onGenerate}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:bg-gray-400"
            >
                {loading ? "Generating..." : "Generate CV"}
            </button>
        </div>
    );
}
