import React from "react";
import { Footer, Header, Main } from "./Components";

function App() {
  // State to manage the theme
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Load theme from localStorage or default to light mode
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle theme and save preference to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    const themeName = newTheme ? "dark" : "light";
    localStorage.setItem("theme", themeName);
    document.documentElement.setAttribute("data-theme", themeName);
  };

  return (
    <>
      <div className="flex flex-col justify-between min-h-dvh">
        <div>
          <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Main />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
