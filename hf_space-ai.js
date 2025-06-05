export async function getRecipeFromSpace(ingredients) {
  const SPACE_URL = "https://camone-mymist1ai-recipe-generator.hf.space";

  try {
    const response = await fetch(`${SPACE_URL}/run/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [ingredients.join(", ")] }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    return result.data[0]; // Returns formatted markdown
  } catch (error) {
    console.error("Fetch error:", error);
    return `## Recipe Failed\n${error.message}\n\nPlease try again.`;
  }
}
