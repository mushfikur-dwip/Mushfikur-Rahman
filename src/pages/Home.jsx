
import React, { useState } from "react";
import generateCV from "../api/generateCV";
import CVPreview from "../components/CVPreview";
import InputForm from "../components/InputForm";

const Home = () => {
    const [userInput, setUserInput] = useState("");
    const [cvData, setCvData] = useState(null);

    const handleGenerate = async () => {
        const result = await generateCV(userInput);
        console.log("Generated CV Data:", result);
        setCvData(result);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Generate Your CV</h2>
            <div className="min-h-screen bg-gray-100 p-6">
               <div className="max-w-4xl mx-auto">
                   <h1 className="text-3xl font-bold text-center mb-6">🎯 AI CV Generator</h1>
                   <InputForm
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                       setUserInput={setUserInput}
                       onGenerate={handleGenerate}
                    />
                    <button onClick={handleGenerate}>Generate CV</button>
               </div>
           </div>
            {cvData ? <CVPreview cvData={cvData} /> : <p>Generated CV will appear here...</p>}
        </div>
    );
};

export default Home;
