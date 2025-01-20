import React from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromMistral } from "../../ai.js";
import chefClaudeLogo from "../assets/images/ai-chef-logo.webp";

const Main = () => {
  const [ingredients, setIngredients] = React.useState([
    // "All the main spices",
    // "Yam",
    // "Chicken",
    // "Eggs",
    // "Plantain",
    // "Vegetable Salad",
    // "Oil",
  ]);
  const [recipe, setRecipe] = React.useState("");
  const [loadRecipe, setLoadRecipe] = React.useState(false);
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
    setLoadRecipe(true);
    // setRecipeShown((prevShown) => !prevShown);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function persistData(newIngList) {
    localStorage.setItem(
      "ingredients",
      JSON.stringify({ ingredients: newIngList })
    );
  }

  React.useEffect(() => {
    if (recipe) {
      setLoadRecipe(false);
      // persistData([]);
      setIngredients([]);
    }
  }, [loadRecipe, recipe]);

  function addIngredient(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("ingredient");
    persistData([...ingredients, newIngredient]);
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    e.currentTarget.reset();
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
      <div>
        <h2 className="font-[700] text-[22px] text-center pb-[14px]">
          Recipe List
        </h2>
      </div>
      <h2 className="font-[700] text-[22px] text-center pb-[14px]">
        Create Recipe😊
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
        className={`z-10 h-dvh w-dvw bg-[rgba(0,0,0,0.6)] backdrop-blur-[20px] absolute moonTrans inset-0 px-[4%] py-[2%]  ${
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
