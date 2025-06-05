import React from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import chefClaudeLogo from "../assets/images/ai-chef-logo.webp";
import { useNavigate } from "react-router-dom";
import { getRecipeFromGemini } from "../../gen-ai.js";
// import { getRecipeFromSpace } from "../../hf_space-ai.js";

const Main = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [savedRecipes, setSavedRecipes] = React.useState([]);

  const [loadRecipe, setLoadRecipe] = React.useState(false);
  const [welcome, setWelcome] = React.useState(true);

  const navigate = useNavigate();
  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (savedRecipes.length > 0) {
      setWelcome(false);
    }
  }, [savedRecipes]);
  React.useEffect(() => {
    if (!(recipe === "") && !(recipeSection.current === null)) {
      //  One Way to ScrollIntoView
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
      //  Another Way
      // const yCoord =
      //   recipeSection.current.getBoundingClientRect().top + window.scrollY;
      // window.scroll({
      //   top: yCoord,
      //   behavior: "smooth",
      // });
    }
  }, [recipe]);

  function handleWelcome() {
    setWelcome((prev) => !prev);
  }

  // Load savedRecipes from localStorage on component mount(Render)
  React.useEffect(() => {
    const storedRecipes = localStorage.getItem("savedRecipes");
    if (storedRecipes) {
      setSavedRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  const extractTitle = (markdown) => {
    // First try to match the ## heading format (most reliable)
    const headingMatch = markdown.match(/^##\s+(.+?)\s*$/m);
    if (headingMatch) return headingMatch[1].trim();

    // Fallback: Look for text between **double asterisks** in the first few lines
    const firstLines = markdown.split("\n").slice(0, 5).join("\n");
    const boldMatch = firstLines.match(/\*\*(.+?)\*\*/);
    if (boldMatch) {
      // Remove any prefix like "here's a recipe for"
      const title = boldMatch[1].replace(/^[a-z ,']+/, "").trim();
      if (title) return title;
    }

    // Final fallback: First non-empty line, cleaned up
    const firstLine = markdown.split("\n").find((line) => line.trim());
    if (firstLine) {
      return firstLine
        .replace(/^[#*_]+/, "")
        .replace(/^[a-z ,']+/, "")
        .trim();
    }

    return "Untitled Recipe";
  };

  async function getRecipe() {
    setLoadRecipe(true);
    // setRecipeShown((prevShown) => !prevShown);
    try {
      const recipeMarkdown = await getRecipeFromGemini(ingredients);

      setRecipe(recipeMarkdown);

      const title = extractTitle(recipeMarkdown);

      // Automatically save to localStorage
      saveToLocalStorage(recipeMarkdown, title);

      return { data: recipeMarkdown, title };
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return null;
    }
  }

  // Save recipe to localStorage
  const saveToLocalStorage = (markdown, title) => {
    if (!markdown) return;

    const newRecipe = {
      id: Date.now(),
      title: title || extractTitle(markdown),
      fullData: markdown,
      dateSaved: new Date().toISOString(),
    };

    const existingRecipes =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const updatedRecipes = [...existingRecipes, newRecipe];

    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  // Delete recipe from localStorage
  const deleteRecipe = (id) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== id);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  // View full recipe
  const viewFullRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  function persistData(newIngList) {
    localStorage.setItem(
      "ingredients",
      JSON.stringify({ ingredients: newIngList })
    );
  }

  React.useEffect(() => {
    if (recipe) {
      setLoadRecipe(false);
      persistData([]);
      setIngredients([]);
    }
  }, [loadRecipe, recipe]);

  function addIngredient(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient").trim(); // Trim whitespace
    // Only proceed if ingredient is not empty
    if (newIngredient) {
      persistData([...ingredients, newIngredient]);
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      e.currentTarget.reset();
    } else {
      alert("Empty ingredient not allowed");
    }
  }
  function deleteIngredient(index) {
    const newIngredient = ingredients.filter((ingredient, ingredientIndex) => {
      return ingredientIndex !== index;
    });
    persistData(newIngredient);
    setIngredients(newIngredient);
  }
  React.useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localIngredients = localStorage.getItem("ingredients");
    if (!localIngredients) {
      return;
    }
    localIngredients = JSON.parse(localIngredients).ingredients;
    setIngredients(localIngredients);
  }, []);

  return (
    <main>
      <div className="flex flex-col mb-[30px]">
        <h2 className="font-[600] text-[22px] pb-[14px]">My Recipe List😊</h2>
        {savedRecipes.length > 0 ? (
          <ul className="flex flex-col gap-[8px] w-full max-w-[520px]">
            {savedRecipes.map((savedRecipe) => (
              <li
                key={savedRecipe.id}
                className="flex items-start justify-between p-2 border-[1px] border-[#d1d5db] rounded-[8px] hover:bg-[var(--area-bg-color)] moonTrans"
              >
                <div
                  className="cursor-pointer flex1 flex flex-col gap-[2px]"
                  onClick={() => viewFullRecipe(savedRecipe.id)}
                >
                  <h3 className="font-[500] hover:text-[var(--button-bg-secondary)] cursor-pointer">
                    {savedRecipe.title}
                  </h3>
                  <p className="text-[12px] md:text-[15px] text-[var(--text-paragraph1)]">
                    {new Date(savedRecipe.dateSaved).toLocaleString()}
                  </p>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteRecipe(savedRecipe.id);
                  }}
                  className="hover:text-[#D11A2A] text-[20px] cursor-pointer text-[var(--text-paragraph1)]"
                >
                  <i className="bx bx-trash"></i>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <h4 className="italic font-[400] text-[var(--text-paragraph2)]">
              You have not created any Recipe yet...
            </h4>
            <h4 className="italic font-[500] text-[var(--text-paragraph2)]">
              Create a new Recipe below...👇👇
            </h4>
          </>
        )}
      </div>
      <h2 className="font-[700] text-[22px] text-center">
        {savedRecipes.length > 0
          ? "Create New Recipe🍵😊"
          : "Create Recipe🍵😊"}
      </h2>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          deleteIngredient={deleteIngredient}
          getRecipe={getRecipe}
          recipeSection={recipeSection}
          loadRecipe={loadRecipe}
        />
      )}
      {recipe && <ClaudeRecipe recipe={recipe} />}

      <div
        className={`z-20 h-dvh w-dvw bg-[rgba(0,0,0,0.6)] backdrop-blur-[20px] fixed moonTrans inset-0 px-[4%] py-[2%]  ${
          welcome ? "opacity-[1]" : "-translate-x-[100%] opacity-0"
        }`}
      >
        <div className="flex flex-row justify-between items-center  font-[600]">
          <div className="flex items-center">
            <img
              src={chefClaudeLogo}
              className="w-[30px] h-[30px] rounded-[8px] "
            />
            <h1 className=" ml-[3px] text-[14px] md:text-[20px] text-[#FFF] fontPacifico">
              WhizzChef
            </h1>
          </div>
          <div
            className="px-[4px] py-[3px] text-[30px] bg-[#111] text-[#FFF] flex rounded-[6px] cursor-pointer"
            onClick={handleWelcome}
          >
            <i className="bx bx-x"></i>
          </div>
        </div>
        <div className="mt-[16%] lg:mt-[10%] text-[#FFF] flex flex-col gap-[3px]">
          <h3 className="text-[18px] md:text[22px] font-[600] text-[#FFF] italic">
            Welcome to WhizzChef! 🍳✨
          </h3>
          <p className="text-[16px] italic">
            Turn your ingredients into mouthwatering recipes in just a few
            steps:
          </p>
          <ul className="text-[14px] space-y-[4px] mt-[10px]">
            <li>
              <span className="font-[600]">
                <i className="bx bxs-bookmark-alt-minus text-[18px]"></i> Add
                Ingredients:
              </span>{" "}
              Enter at least 4 ingredients you have at home.
            </li>
            <li>
              <span className="font-[600]">
                <i className="bx bxs-bookmark-alt-minus text-[18px]"></i> Get
                Creative:
              </span>{" "}
              Click the "Get Recipe" button to let our AI chef work its magic.
            </li>
            <li>
              <span className="font-[600]">
                <i className="bx bxs-bookmark-alt-minus text-[18px]"></i> Enjoy
                Cooking:
              </span>{" "}
              Receive a unique recipe tailored to your ingredients.
            </li>
          </ul>
          <p className="text-[16px] italic mt-[14px]">
            WhizzChef makes cooking simple, fun, and innovative. Unleash your
            inner chef today!
          </p>
        </div>

        <div className="mt-[16px]">
          <div className="text-[#FFF] text-[24px] animate-bounce ml-[50px]">
            <i className="-rotate-90 bx bx-arrow-back "></i>
          </div>
          <button
            className="bg-[#111] text-[#FFF] py-[4px] px-[12px] rounded-[8px] font-[600] cursor-pointer"
            onClick={handleWelcome}
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;
