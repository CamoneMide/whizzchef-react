import React from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromMistral } from "../../ai.js";
import chefClaudeLogo from "../assets/images/ai-chef-logo.webp";

const Main = () => {
  const [ingredients, setIngredients] = React.useState([
    // "Rice",
    // "Chicken",
    // "Beans",
    // "Plantain",
    // "Vegetable Salad",
    // "All the main spices",
  ]);
  const [recipe, setRecipe] = React.useState("");
  const [welcome, setWelcome] = React.useState(true);
  const recipeSection = React.useRef(null);

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

  async function getRecipe() {
    // setRecipeShown((prevShown) => !prevShown);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    e.currentTarget.reset();
  }

  return (
    <main>
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
          getRecipe={getRecipe}
          recipeSection={recipeSection}
        />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}

      <div
        className={`"h-dvh w-dvw bg-[rgba(0,0,0,0.6)] backdrop-blur-[20px] absolute moonTrans inset-0 px-[4%] py-[2%]  ${
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
            className="px-[4px] py-[3px] text-[30px] bg-[#3a3a36] text-[#FFF] flex rounded-[6px] cursor-pointer"
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
                <i className="bx bxs-bookmark-alt-minus text-[18px]"></i> Add
                Get Creative:
              </span>{" "}
              Click the "Get Recipe" button to let our AI chef work its magic.
            </li>
            <li>
              <span className="font-[600]">
                <i className="bx bxs-bookmark-alt-minus text-[18px]"></i> Add
                Enjoy Cooking:
              </span>{" "}
              Receive a unique recipe tailored to your ingredients.
            </li>
          </ul>
          <p className="text-[16px] italic mt-[14px]">
            WhizzChef makes cooking simple, fun, and innovative. Unleash your
            inner chef today!
          </p>
        </div>
        <div className="mt-[10px]">
          <button
            className="bg-[#3a3a36] text-[#FFF] py-[4px] px-[12px] rounded-[8px] font-[600] cursor-pointer"
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
