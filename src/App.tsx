import { useState } from "react";
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
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
