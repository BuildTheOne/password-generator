import { useState } from "react";
import { useCookies } from "react-cookie";
import { number, lowerCase, upperCase, symbol } from "../utils/charset";
import { lengthOption, totalPasswordOption } from "../utils/options";

const Form = () => {
  const [password, setPassword] = useState("");

  const [settings, setSettings] = useState({
    // Basic
    length: 16,
    isLengthCustom: false,
    isNumberOnly: false,
    includeNumber: true,
    includeLowerCase: true,
    includeUpperCase: true,
    includeSymbol: false,
    // Advanced
    isLetterFirst: false,
    isSymbolCustom: false,
    customSymbol: ".,?!;|+-_=",
    numberPassword: 1,
  });

  const [advanced, openAdvanced] = useState(false);
  const [lockCopyBtn, setLockCopyBtn] = useState(true);
  const [passwordCopy, setPasswordCopy] = useState(false);

  function handleLength(e) {
    if (e.target.value === "custom") {
      setSettings({
        ...settings,
        isLengthCustom: true,
      });
    } else {
      setSettings({
        ...settings,
        length: e.target.value,
        isLengthCustom: false,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLockCopyBtn(false);

    // Cookie

    if (
      !settings.includeNumber &&
      !settings.includeLowerCase &&
      !settings.includeUpperCase &&
      !settings.includeSymbol
    ) {
      alert("Choose minimum 1 option");
    } else {
      let charset = [];
      if (settings.isNumberOnly) {
        charset = charset.concat(number);
      } else {
        if (settings.includeNumber) {
          charset = charset.concat(number);
        }
        if (settings.includeLowerCase) {
          charset = charset.concat(lowerCase);
        }
        if (settings.includeUpperCase) {
          charset = charset.concat(upperCase);
        }
        if (settings.includeSymbol) {
          if (settings.isSymbolCustom) {
            charset = charset.concat(settings.customSymbol.split(""));
          } else {
            charset = charset.concat(symbol);
          }
        }
      }

      let newPasswords = [];
      for (let i = 0; i < settings.numberPassword; i++) {
        let newPassword = "";
        for (let j = 0; j < settings.length; j++) {
          let newChar;
          if (
            settings.isLetterFirst &&
            j === 0 &&
            !settings.isNumberOnly &&
            (settings.includeLowerCase || settings.includeUpperCase)
          ) {
            let tempCharset = [];
            if (settings.includeLowerCase) {
              tempCharset = tempCharset.concat(lowerCase);
            }
            if (settings.includeUpperCase) {
              tempCharset = tempCharset.concat(upperCase);
            }
            newChar =
              tempCharset[Math.floor(Math.random() * tempCharset.length)];
          } else {
            newChar = charset[Math.floor(Math.random() * charset.length)];
          }
          newPassword = newPassword + newChar;
        }
        newPasswords.push(newPassword);
      }
      setPassword(newPasswords.join("\n"));
    }
  }

  function handleCopy(e) {
    e.preventDefault();
    navigator.clipboard.writeText(password);
    setPasswordCopy(true);
    setTimeout(() => setPasswordCopy(false), 3000);
  }

  return (
    <div className="flex flex-col w-full md:w-1/2 dark:text-white gap-8 my-8">
      <form>
        <div className="flex flex-col p-4 w-full gap-3 text-lg">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between md:mx-8">
              <label htmlFor="length" className="text-center md:text-justify">
                Password Length
              </label>
              <div className="flex flex-col md:flex-row gap-2">
                <select
                  id="length"
                  onChange={(e) => handleLength(e)}
                  className="border-2 dark:bg-black dark:border-black rounded-lg p-1"
                >
                  {lengthOption.map((i) => (
                    <option
                      value={i.value}
                      selected={i.value === 16 ? true : false}
                    >
                      {i.option}
                    </option>
                  ))}
                </select>
                {settings.isLengthCustom ? (
                  <input
                    type="number"
                    id=""
                    className="border-2 dark:bg-black dark:border-black rounded-lg p-1"
                    min={6}
                    max={10000}
                    value={settings.length}
                    onChange={(e) =>
                      setSettings({ ...settings, length: e.target.value })
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:px-8">
            <label htmlFor="numberOnly">Number Only</label>
            <input
              type="checkbox"
              checked={settings.isNumberOnly}
              id="numberOnly"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  isNumberOnly: !settings.isNumberOnly,
                })
              }
              className=""
            />
          </div>

          <div className="flex items-center justify-between md:px-8">
            <label htmlFor="number">Include Number</label>
            <input
              type="checkbox"
              checked={settings.isNumberOnly ? true : settings.includeNumber}
              id="number"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  includeNumber: !settings.includeNumber,
                })
              }
              className=""
              disabled={settings.isNumberOnly}
            />
          </div>

          <div className="flex items-center justify-between md:px-8">
            <label htmlFor="lowercase">Include Lowercase</label>
            <input
              type="checkbox"
              checked={
                settings.isNumberOnly ? false : settings.includeLowerCase
              }
              id="lowercase"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  includeLowerCase: !settings.includeLowerCase,
                })
              }
              className=""
              disabled={settings.isNumberOnly}
            />
          </div>

          <div className="flex items-center justify-between md:px-8">
            <label htmlFor="uppercase">Include Uppercase</label>
            <input
              type="checkbox"
              checked={
                settings.isNumberOnly ? false : settings.includeUpperCase
              }
              id="uppercase"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  includeUpperCase: !settings.includeUpperCase,
                })
              }
              className=""
              disabled={settings.isNumberOnly}
            />
          </div>

          <div className="flex items-center justify-between md:px-8">
            <label htmlFor="symbol">Include Symbol (.,?!;|+-_=)</label>
            <input
              type="checkbox"
              checked={settings.isNumberOnly ? false : settings.includeSymbol}
              id="symbol"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  includeSymbol: !settings.includeSymbol,
                })
              }
              className=""
              disabled={settings.isNumberOnly}
            />
          </div>

          <div className="flex flex-col justify-center bg-gray-200 dark:bg-slate-700 rounded-lg p-3 gap-2">
            <button
              onClick={(e) => {
                openAdvanced(!advanced);
                e.preventDefault();
              }}
              className="flex justify-center items-center"
            >
              <p>Advanced Settings</p>
              <svg
                className={`w-6 h-6 transition ease-in-out duration-300 ${
                  advanced ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`transition flex flex-col ${
                advanced ? "" : "hidden absolute"
              } gap-2`}
            >
              <div
                className="flex items-center justify-between md:px-8"
                title={
                  !settings.includeUpperCase && !settings.includeLowerCase
                    ? "Set Alphabetical Character First"
                    : ""
                }
              >
                <label htmlFor="letterFirst">Begin with a letter</label>
                <input
                  type="checkbox"
                  checked={
                    settings.isNumberOnly
                      ? false
                      : !settings.includeUpperCase && !settings.includeLowerCase
                      ? false
                      : settings.isLetterFirst
                  }
                  id="letterFirst"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      isLetterFirst: !settings.isLetterFirst,
                    })
                  }
                  className=""
                  disabled={
                    settings.isNumberOnly ||
                    (!settings.includeUpperCase && !settings.includeLowerCase)
                  }
                />
              </div>
              <div
                className="flex items-center justify-between md:px-8"
                title={settings.includeSymbol ? "" : "Set Include Symbol First"}
              >
                <label htmlFor="customSymbol">Use custom symbols</label>
                <input
                  type="checkbox"
                  checked={
                    settings.isNumberOnly
                      ? false
                      : settings.includeSymbol
                      ? settings.isSymbolCustom
                      : false
                  }
                  id="customSymbol"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      isSymbolCustom: !settings.isSymbolCustom,
                    })
                  }
                  className=""
                  disabled={settings.isNumberOnly || !settings.includeSymbol}
                  pattern="[^A-Za-z0-9]"
                />
              </div>
              {settings.isSymbolCustom && settings.includeSymbol ? (
                <input
                  type="text"
                  value={settings.customSymbol}
                  className="border-2 dark:bg-black dark:border-black rounded-lg p-1 md:mx-8"
                  onChange={(e) =>
                    setSettings({ ...settings, customSymbol: e.target.value })
                  }
                  required
                />
              ) : (
                <></>
              )}
              <div className="flex items-center justify-between md:px-8">
                <label htmlFor="total">Number of Passwords</label>
                <select
                  id="total"
                  className="border-2 dark:bg-black dark:border-black rounded-lg p-1"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      numberPassword: e.target.value,
                    })
                  }
                >
                  {totalPasswordOption.map((i) => (
                    <option value={i.value}>{i.option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-4 justify-center items-center md:flex-row w-full px-4 md:px-10 gap-2">
          <button
            type="submit"
            className="p-2 bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600 rounded-md w-full text-lg font-semibold"
            title="Generate Password"
            onClick={(e) => handleSubmit(e)}
          >
            Generate
          </button>
          <button
            onClick={(e) => handleCopy(e)}
            className={`${
              lockCopyBtn ? "" : "hover:bg-gray-400 dark:hover:bg-slate-600"
            } p-2 bg-gray-300 dark:bg-slate-700 rounded-md w-full text-lg font-semibold`}
            title={
              lockCopyBtn
                ? "Password not available, generate password first"
                : "Copy Passwords"
            }
            disabled={lockCopyBtn}
          >
            Copy
          </button>
        </div>
      </form>

      <div className="flex justify-center rounded-lg mx-4 md:mx-0">
        <textarea
          id=""
          cols="70"
          rows={settings.numberPassword}
          className="border-2 dark:bg-black dark:border-black rounded-lg p-2 resize-none whitespace-normal"
          value={password}
          wrap={"off"}
        />
      </div>

      <div className="flex fixed bottom-4 inset-x-0 items-center justify-center">
        <button
          onClick=""
          className={`transition ${
            passwordCopy
              ? "duration-300 opacity-100"
              : "ease-in-out opacity-0 translate-y-24 duration-700"
          } p-2 rounded-lg bg-gray-300 dark:bg-gray-900 dark:text-white text-lg font-semibold text-center`}
        >
          Password Copied!
        </button>
      </div>
    </div>
  );
};

export default Form;
