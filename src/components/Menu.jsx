import { useState } from "react";

const Menu = ({ isDarkMode, handleDarkMode }) => {
  const [menu, openMenu] = useState(true);

  return (
    <div
      className={`transition duration-300 ${
        menu ? "ease-in translate-x-16" : "ease-out"
      } flex items-end fixed bottom-0 md:bottom-5 right-0 md:right-2`}
    >
      <button
        className="dark:bg-slate-900 bg-gray-300 rounded-l-lg py-2"
        onClick={() => openMenu(!menu)}
        title="Settings"
      >
        <svg
          className={`w-8 h-8 dark:text-white transition duration-300 ${menu ? "" : "rotate-180"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="flex flex-col p-1 rounded-t-md rounded-br-md dark:bg-slate-900 bg-gray-300">
        <button
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
          onClick={(e) => handleDarkMode(e)}
          title={isDarkMode ? "Switch to Light Side" : "Switch to Dark Side"}
        >
          {!isDarkMode ? (
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />{" "}
            </svg>
          )}
        </button>
        <button
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
          title="To source code"
        >
          <a
            href="https://github.com/BuildTheOne/password-generator"
            target={"_blank"}
            rel="noreferrer"
          >
            <svg
              className="w-8 h-8 dark:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </button>
      </div>
    </div>
  );
};

export default Menu;
