import React from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const foundRecipe = savedRecipes.find((r) => r.id === Number(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <>
      <div className="flex flex-col justify-between min-h-dvh">
        <div>
          <Header />
          <section
            className="suggested-recipe-container py-[20px] max-w-4xl p-4 mx-auto"
            aria-live="polite"
          >
            <Link
              to={"/"}
              // onClick={() => window.history.back()}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              ← Back
            </Link>

            <div className="max-w-none mt-[30px]">
              <ReactMarkdown>{recipe.fullData}</ReactMarkdown>
            </div>
          </section>
        </div>
        <div className="mb-1">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
