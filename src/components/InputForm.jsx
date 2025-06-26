import React, { useEffect, useState } from "react";

const prompts = [
    "Simulate a conversation between [character 1] and [character 2] discussing [topic].",
    "Create a plan for a [type of event] for [number] people, including [specific requirement].",
    "Design a [type of workout] plan for [fitness level] individuals aiming to [goal] in [timeframe].",
    "Write a detailed CV in JSON format for [full_name], a [software engineering role] based in [city, country] with [X years] of experience in [technologies, frameworks, or fields]. Include sections for contact information, professional summary, key skills, work experience (with bullet points), education, certifications, and relevant projects."
];

export default function InputForm({ userInput, setUserInput, onGenerate }) {
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [placeholders, setPlaceholders] = useState([]);
    const [values, setValues] = useState({});
    const [finalPrompt, setFinalPrompt] = useState("");

    const extractPlaceholders = (prompt) => {
        if (!prompt || typeof prompt !== "string") return;

        const matches = [...new Set((prompt.match(/\[(.*?)\]/g) || []).map(p => p.replace(/[\[\]]/g, "")))];
        setPlaceholders(matches);

        const updatedValues = {};
        matches.forEach((p) => {
            updatedValues[p] = values[p] || "";
        });
        setValues(updatedValues);
    };

    const updateFinalPrompt = () => {
        let result = selectedPrompt;
        placeholders.forEach((p) => {
            const regex = new RegExp(`\\[${p}\\]`, "g");
            result = result.replace(regex, values[p] || `[${p}]`);
        });
        setFinalPrompt(result);
        setUserInput(result); // Send back to parent
    };

    useEffect(() => {
        extractPlaceholders(selectedPrompt);
    }, [selectedPrompt]);

    useEffect(() => {
        updateFinalPrompt();
    }, [values, selectedPrompt]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            {/* Prompt Selector */}
            <label className="block font-semibold mb-2">📋 Choose a prompt:</label>
            <select
                className="w-full p-2 border rounded mb-4"
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
            >
                <option value="">-- Select a prompt --</option>
                {prompts.map((p, idx) => (
                    <option key={idx} value={p}>
                        {p.slice(0, 60)}...
                    </option>
                ))}
            </select>

            {/* Placeholder Fillers */}
            {placeholders.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold mb-1">✍️ Fill in the placeholders:</h3>
                    {placeholders.map((ph, idx) => (
                        <div key={idx}>
                            <label className="block text-gray-600">{ph}</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={values[ph] || ""}
                                onChange={(e) =>
                                    setValues((prev) => ({ ...prev, [ph]: e.target.value }))
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Final prompt display */}
            {finalPrompt && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-1">🧠 Final Prompt:</h3>
                    <textarea
                        className="w-full h-32 p-3 border rounded bg-gray-50"
                        readOnly
                        value={finalPrompt}
                    />
                </div>
            )}

            <button
                onClick={onGenerate}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
                Generate CV
            </button>
        </div>
    );
}
