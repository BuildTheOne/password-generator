import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Form from "./components/Form";
import Menu from "./components/Menu";

function App() {
  document.title = "Password Generator";

  const [isDarkMode, setDarkMode] = useState(false);

  function handleDarkMode(e) {
    setDarkMode(!isDarkMode);

    const html = document.querySelector("html");
    if (!isDarkMode) {
      html.classList.add("dark");
      html.style.backgroundColor = "#1e293b";
    } else {
      html.classList.remove("dark");
      html.style.backgroundColor = "#f3f4f6";
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-slate-800 py-5 gap-4 font-nunito">
      <h1 className="text-dark dark:text-white text-4xl font-bold text-center font-oswald">
        Password Generator
      </h1>
      <Form />
      <Menu isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} />
    </div>
  );
}

export default App;
