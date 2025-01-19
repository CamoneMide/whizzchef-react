const IngredientsList = ({
  ingredients,
  deleteIngredient,
  getRecipe,
  recipeSection,
  loadRecipe,
}) => {
  const ingredientsListItems = ingredients.map((ingredient, index) => (
    <div
      className="flex items-center w-full lg:w-[50%] px-2 bg-[var(--area-bg-color)]"
      key={`${ingredient}-${index}`}
    >
      <li className="flex1">{ingredient}</li>
      <div
        onClick={() => {
          deleteIngredient(index);
        }}
        className="hover:text-[var(--button-bg-secondary)] text-[20px] cursor-pointer"
      >
        <i className="bx bx-trash"></i>
      </div>
    </div>
  ));

  return (
    <section>
      <h2 className="text-[20px] font-[600] mt-10 mb-2">
        Ingredients on hand:
      </h2>
      <ul
        className="flex flex-col space-y-1 ingredients-list"
        aria-live="polite"
      >
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
