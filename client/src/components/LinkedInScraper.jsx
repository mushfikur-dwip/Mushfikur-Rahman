import React, { useState } from 'react';

export default function LinkedInScraper() {
    const [url, setUrl] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScrape = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:5000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (response.ok) {
                setProfileData(data);
            } else {
                setError(data.error || 'Failed to scrape the profile');
            }
        } catch (error) {
            setError('Error scraping the LinkedIn profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>LinkedIn Scraper</h1>
            <input
                type="text"
                placeholder="Enter LinkedIn profile URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border p-2"
            />
            <button onClick={handleScrape} className="bg-blue-600 text-white p-2 rounded mt-4">
                {loading ? 'Scraping...' : 'Scrape Profile'}
            </button>

            {error && <p className="text-red-600">{error}</p>}

            {profileData && (
                <div className="mt-6">
                    <h3>Name: {profileData.name}</h3>
                    <h4>Title: {profileData.title}</h4>
                    <p>Location: {profileData.location}</p>
                </div>
            )}
        </div>
    );
}
