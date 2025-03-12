export async function getSummary(text: string): Promise<string> {
    // Construct the prompt by prepending instructions to summarize the GitHub data
    const prompt = "Summarize the following GitHub user data in under 100 words: " + text;
    
    const requestBody = {
        contents: [
            {
            role: "user",
            parts: [{ text: prompt }]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 150,
            responseMimeType: "text/plain"
        }
    };
  
    const apiKey = "AIzaSyDxiSBfk9hTV2oSh2DQTkxNL3hazrR3C4I"; // Make sure this is set in your environment
    const model = "gemini-2.0-flash"; // Adjust model as needed
  
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        }
    );
  
    if (!response.ok) {
        throw new Error("Failed to generate summary from Gemini API");
    }
  
    const data = await response.json();
    // Extract the summary text from the API response
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }  