// import React, { useEffect, useState } from "react";

// // const prompts = [
// //     "Simulate a conversation between [character 1] and [character 2] discussing [topic].",
// //     "Create a plan for a [type of event] for [number] people, including [specific requirement].",
// //     "Design a [type of workout] plan for [fitness level] individuals aiming to [goal] in [timeframe].",
// //     "Write a detailed CV in JSON format for [full_name], a [software engineering role] based in [city, country] with [X years] of experience in [technologies, frameworks, or fields]. Include sections for contact information, professional summary, key skills, work experience (with bullet points), education, certifications, and relevant projects."
// // ];

// export default function InputForm({ userInput, setUserInput, onGenerate }) {
//     const [selectedPrompt, setSelectedPrompt] = useState("");
//     const [placeholders, setPlaceholders] = useState([]);
//     const [values, setValues] = useState({});
//     const [finalPrompt, setFinalPrompt] = useState("");
//     const [prompts, setPrompts] = useState([]);

//     useEffect(() => {
//         fetch("/prompts.json")
//             .then((res) => res.json())
//             .then((data) => setPrompts(data))
//             .catch((err) => console.error("Failed to load prompts", err));
//     }, []);

//     const extractPlaceholders = (prompt) => {
//         if (!prompt || typeof prompt !== "string") return;

//         const matches = [...new Set((prompt.match(/\[(.*?)\]/g) || []).map(p => p.replace(/[\[\]]/g, "")))];
//         setPlaceholders(matches);

//         const updatedValues = {};
//         matches.forEach((p) => {
//             updatedValues[p] = values[p] || "";
//         });
//         setValues(updatedValues);
//     };

//     const updateFinalPrompt = () => {
//         let result = selectedPrompt;
//         placeholders.forEach((p) => {
//             const regex = new RegExp(`\\[${p}\\]`, "g");
//             result = result.replace(regex, values[p] || `[${p}]`);
//         });
//         setFinalPrompt(result);
//         setUserInput(result); // Send back to parent
//     };

//     useEffect(() => {
//         extractPlaceholders(selectedPrompt);
//     }, [selectedPrompt]);

//     useEffect(() => {
//         updateFinalPrompt();
//     }, [values, selectedPrompt]);

//     return (
//         <div className="bg-white p-6 rounded-xl shadow-md mb-6">
//             {/* Prompt Selector */}
//             <label className="block font-semibold mb-2">📋 Choose a prompt:</label>
//             <select
//                 className="w-full p-2 border rounded mb-4"
//                 value={selectedPrompt}
//                 onChange={(e) => setSelectedPrompt(e.target.value)}
//             >
//                 <option value="">-- Select a prompt --</option>
//                 {prompts.map((p, idx) => (
//                     <option key={idx} value={p}>
//                         {p.slice(0, 60)}...
//                     </option>
//                 ))}
//             </select>

//             {/* Placeholder Fillers */}
//             {placeholders.length > 0 && (
//                 <div className="space-y-4">
//                     <h3 className="font-semibold mb-1">✍️ Fill in the placeholders:</h3>
//                     {placeholders.map((ph, idx) => (
//                         <div key={idx}>
//                             <label className="block text-gray-600">{ph}</label>
//                             <input
//                                 type="text"
//                                 className="w-full p-2 border rounded"
//                                 value={values[ph] || ""}
//                                 onChange={(e) =>
//                                     setValues((prev) => ({ ...prev, [ph]: e.target.value }))
//                                 }
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Final prompt display */}
//             {finalPrompt && (
//                 <div className="mt-6">
//                     <h3 className="font-semibold mb-1">🧠 Final Prompt:</h3>
//                     <textarea
//                         className="w-full h-32 p-3 border rounded bg-gray-50"
//                         readOnly
//                         value={finalPrompt}
//                     />
//                 </div>
//             )}

//             <button
//                 onClick={onGenerate}
//                 className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
//             >
//                 Generate CV
//             </button>
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";

export default function InputForm({ userInput, setUserInput, onGenerate }) {
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [placeholders, setPlaceholders] = useState([]);
    const [values, setValues] = useState({});
    const [finalPrompt, setFinalPrompt] = useState("");
    const [prompts, setPrompts] = useState([]);
    const [showTemplates, setShowTemplates] = useState(false); // For modal

    // Load prompts from JSON
    useEffect(() => {
        fetch("/prompts.json")
            .then((res) => res.json())
            .then((data) => setPrompts(data))
            .catch((err) => console.error("Failed to load prompts", err));
    }, []);

    // Extract placeholders from selected prompt
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

    // Replace placeholders with values
    const updateFinalPrompt = () => {
        let result = selectedPrompt;
        placeholders.forEach((p) => {
            const regex = new RegExp(`\\[${p}\\]`, "g");
            result = result.replace(regex, values[p] || `[${p}]`);
        });
        setFinalPrompt(result);
        setUserInput(result); // Send to parent
    };

    useEffect(() => {
        extractPlaceholders(selectedPrompt);
    }, [selectedPrompt]);

    useEffect(() => {
        updateFinalPrompt();
    }, [values, selectedPrompt]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 relative">
            {/* Top bar with template button */}
            <div className="flex justify-between items-center mb-4">
                <label className="block font-semibold">📋 Prompt Input:</label>
                <button
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 text-sm"
                    onClick={() => setShowTemplates(true)}
                >
                    🧩 Templates
                </button>
            </div>

            {/* Prompt Input Area */}
            <textarea
                className="w-full h-28 p-3 border rounded bg-gray-50 mb-4"
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                placeholder="Write or insert a prompt template..."
            />

            {/* Placeholder Fillers */}
            {placeholders.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold mb-1">✍️ Fill in the placeholders:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {placeholders.map((ph, idx) => (
                            <div key={idx} >
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

            {/* Generate Button */}
            <button
                onClick={onGenerate}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
                Generate CV
            </button>

            {/* Template Modal */}
            {showTemplates && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex justify-center items-center">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative z-50 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">📄 Choose a Template</h2>
                        <ul className="space-y-4">
                            {prompts.map((prompt, idx) => (
                                <li key={idx} className="border p-3 rounded-md">
                                    <p className="text-sm text-gray-700 mb-2">{prompt}</p>
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                        onClick={() => {
                                            setSelectedPrompt(prompt);
                                            setShowTemplates(false);
                                        }}
                                    >
                                        Use
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                            onClick={() => setShowTemplates(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
