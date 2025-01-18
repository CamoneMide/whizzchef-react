const IngredientsList = ({
  ingredients,
  getRecipe,
  recipeSection,
  loadRecipe,
}) => {
  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  return (
    <section>
      <h2 className="text-[20px] font-[600] mt-10">Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={recipeSection}>
            <h3>Ready for a recipe?</h3>
            <p className="text-[12px] md:text-[15px]">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <button
            className="py-[5px] md:py-[8px] px-[12px] md:px-[17px]"
            onClick={getRecipe}
          >
            {loadRecipe ? (
              <span className="flex animate-spin border-[var(--button-text)] rounded-full border-r-[transparent] border-b-[transparent] border-[4px] p-[8px] md:border-[6px] md:p-[12px] md:mx-[8px] md:my-[3px]"></span>
            ) : (
              "Get a recipe"
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default IngredientsList;
