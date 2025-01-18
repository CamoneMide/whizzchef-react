import ReactMarkdown from "react-markdown";

const ClaudeRecipe = ({ recipe }) => {
  return (
    <section
      className="suggested-recipe-container py-[20px] mt-[10px]"
      aria-live="polite"
    >
      <h2 className="py-[4px] text-[20px] font-[600]">WhizzChef Recommends:</h2>
      {/* <h2>
        Chef Claude Recommends:
      </h2> */}
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
};

export default ClaudeRecipe;
