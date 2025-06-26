const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors"); // Import CORS
const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your React app to make requests
    methods: ["GET", "POST", "OPTIONS"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);// This will allow requests from any origin

app.use(express.json()); // To parse JSON data

// Scraping endpoint
app.post("/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const data = await page.evaluate(() => {
      return {
        name: document.querySelector(".top-card-layout__title")
          ? document.querySelector(".top-card-layout__title").innerText
          : "Not Available",
        title: document.querySelector(".top-card-layout__headline")
          ? document.querySelector(".top-card-layout__headline").innerText
          : "Not Available",
        location: document.querySelector(".top-card__subline-item")
          ? document.querySelector(".top-card__subline-item").innerText
          : "Not Available",
      };
    });

    await browser.close();
    return res.status(200).send(data);
  } catch (error) {
    console.error("Error scraping LinkedIn:", error);
    return res.status(500).send({ error: "Failed to scrape LinkedIn profile" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
