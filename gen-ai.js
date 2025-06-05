const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    let chatHistory = [];
    // Combine the system prompt and user prompt into a single user message
    // as gemini-2.0-flash handles system instructions well within the user turn.
    chatHistory.push({
      role: "user",
      parts: [
        {
          text: `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });

    const payload = {
      contents: chatHistory,
      // You can add generationConfig here if you need to control aspects
      // like temperature, topP, topK, or response schema.
      // For a simple text response, it's not strictly necessary unless specific constraints are needed.
      // generationConfig: {
      //   maxOutputTokens: 1024, // Equivalent to max_tokens in HuggingFace
      // },
    };

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json(); // Use await here to parse the JSON response

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const text = result.candidates[0].content.parts[0].text;
      return text;
    } else {
      console.error("Gemini API response structure unexpected:", result);
      return "Could not generate a recipe. Please try again.";
    }
  } catch (err) {
    console.error("Error calling Gemini API:", err.message);
    return "An error occurred while fetching the recipe.";
  }
}
