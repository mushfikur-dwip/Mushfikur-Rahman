import React, { useState } from "react";
import generateCV from "../api/generateCV";
import CVPreview from "../components/CVPreview";
import InputForm from "../components/InputForm";
import LinkedInScraper from "../components/LinkedInScraper";

const Home = () => {
    const [userInput, setUserInput] = useState("");
    const [cvData, setCvData] = useState(null);

    const handleGenerate = async () => {
        const result = await generateCV(userInput);
        console.log("Generated CV Data:", result);
        setCvData(result);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div>
                <LinkedInScraper />
           </div>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">🎯 AI CV Generator</h1>
                <InputForm
                    userInput={userInput}
                    setUserInput={setUserInput}
                    onGenerate={handleGenerate}
                />
                {cvData ? (
                    <CVPreview cvData={cvData} />
                ) : (
                    <p className="mt-6 text-center text-gray-500">Generated CV will appear here...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
