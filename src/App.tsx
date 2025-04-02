import { useState, useEffect } from "react";
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches;
      setIsDark(newMode);
      localStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} isDark={isDark} />
      <Main isDark={isDark} />
      <Footer isDark={isDark} />
    </>
  )
}

export default App
