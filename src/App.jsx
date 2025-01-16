import React from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";

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
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Main />
    </>
  );
}

export default App;
