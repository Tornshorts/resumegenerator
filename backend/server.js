import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Async function to interact with Google Generative AI
async function generateResume(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Replace with your API key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Extract the generated text response
  } catch (error) {
    console.error("Error generating resume:", error);
    return "Error generating resume. Please try again.";
  }
}

// Route to handle form submission and generate resume
app.post("/submit", async (req, res) => {
  const formData = req.body;

  // Log the received data (for demonstration purposes)
  console.log("Form Data Received:", formData);

  // Structure the prompt for resume generation
  const prompt = `
  Generate a professional resume based on the following information:
  Name: ${formData.firstName} ${formData.lastName}
  Email: ${formData.email}
  Phone: ${formData.phone}
  Degree: ${formData.degree}
  Institution: ${formData.institution}
  Graduation Year: ${formData.graduationYear}
  Company: ${formData.company}
  Job Title: ${formData.jobTitle}
  Job Duration: ${formData.jobDuration}
  Skills: ${formData.skills}
  
  The format should be plain text, with no bold, italic, or markdown-like formatting. Each section should be as follows:
  
  Matt Riffe
  mattriffe@gmail.com | 0748579623

  Summary
  Highly skilled and versatile software engineer with over 8 years of experience in front-end development, data science, and bug fixing. Proven ability to leverage expertise in Python, React, JavaScript, and various databases (SQL, MySQL, PostgreSQL) to deliver high-quality solutions across diverse projects. Proficient in utilizing cloud platforms (AWS, Azure) and containerization technologies (Docker) to optimize development workflows and enhance application scalability.

  Experience
  AzureT | Data Scientist | 2022–Present
  - Developed and implemented a machine learning model that improved X by Y%.
  - Led the development of a new data pipeline resulting in a Z% reduction in processing time.
  - Utilized Python and Pandas to analyze large datasets, identifying key trends and insights.

  AzureT | Front-End Developer | 2020–2022
  - Developed and maintained responsive user interfaces using React, Vite, and JavaScript.
  - Improved website load times by X% through code optimization and efficient resource management.
  - Successfully resolved critical production bugs, minimizing service disruptions and improving application stability.

  Skills
  - Programming Languages: Python, JavaScript, React, Vite, Rust, C++, SQL
  - Databases: MySQL, PostgreSQL
  - Frameworks/Libraries: Pandas, Django, Flask, REST APIs
  - Tools & Technologies: Git, Docker, AWS, Azure
  - Other: Bug Fixing, Fine-Tuning, Data Analysis, Responsive Web Design

  Education
  University of California | Bachelor of Science in Computer Science | 2004
`;


  // Generate resume using Google Generative AI
  const resumeResponse = await generateResume(prompt);
  console.log(resumeResponse);
  // Send a response back to the client with the generated resume
  res.status(200).json({
    message: "Resume generated successfully!",
    resume: resumeResponse, // Include the AI-generated resume
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
