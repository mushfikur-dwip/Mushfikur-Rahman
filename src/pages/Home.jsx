import React, { useState } from "react";
import InputForm from "../components/InputForm";
import CVPreview from "../components/CVPreview";
import generateCV from "../api/generateCV";

export default function Home() {
    const [userInput, setUserInput] = useState("");
    const [cvData, setCvData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        const result = await generateCV(userInput);
        setCvData(result); // pass to CVPreview
        setLoading(false);
    };
      

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">🎯 AI CV Generator</h1>
                <InputForm
                    userInput={userInput}
                    setUserInput={setUserInput}
                    onGenerate={handleGenerate}
                    loading={loading}
                />

                {cvData && (
                    <div className="mt-10">
                        <CVPreview data={cvData} />
                    </div>
                )}
            </div>
        </div>
    );
}
