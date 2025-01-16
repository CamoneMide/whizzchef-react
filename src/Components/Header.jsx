import chefClaudeLogo from "../assets/images/ai-chef-logo.webp";
const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header>
      <a href="/" className="hDiv1 cursor-pointer">
        <img src={chefClaudeLogo} className="imgForLogo" />
        <h1 className=" text-[16px] md:text-[24px]">WhizzChef</h1>
      </a>
      <div
        className={`px-[8px] py-[2px] rounded-full text-[24px] cursor-pointer ${
          isDarkMode
            ? "mt-[2px] bg-[#3a3a36] hover:text-[#f0efeb] hover:bg-[#111] text-[#FFF]"
            : "bg-[#3a3a36] text-[#f0efeb] hover:bg-[#111] hover:text-[#FFF]"
        }`}
        onClick={toggleTheme}
      >
        <i
          className={`moonTrans bx ${isDarkMode ? "bxs-sun" : "bxs-moon"}`}
        ></i>
      </div>
    </header>
  );
};

export default Header;
