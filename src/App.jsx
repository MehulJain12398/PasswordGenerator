import { useState } from "react";
import "./App.css";
import CheckboxComponent from "./components/CheckboxComponent";
import usePasswordGenerator from "./hooks/usePasswordGenerator";

function App() {
  const [charLength, setCharLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const handleCheckboxData = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;

    setCheckboxData(updatedCheckboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator(
    checkboxData,
    charLength
  );
  return (
    <div className="parentContainer">
      <div className="container">
        {/* password & copy button */}
        {password && (
          <div className="header">
            <div className="title">{password}</div>
            <button className="copyBtn">copy</button>
          </div>
        )}
        {/* character length and range */}
        <div className="charlength">
          <span>
            <label>Character Length</label>
            <label>{charLength}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={charLength}
            onChange={(e) => setCharLength(e.target.value)}
          />
        </div>
        {/* checkboxes */}
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <CheckboxComponent
                key={index}
                state={checkbox.state}
                title={checkbox.title}
                onChange={() => handleCheckboxData(index)}
              />
            );
          })}
        </div>
        {/* strength information */}
        {/* generate button */}
        <div className="errorMessage">{errorMessage}</div>
        <div className="generateBtnSection">
          <button
            className="generateBtn"
            onClick={() => generatePassword(checkboxData, charLength)}
          >
            generate password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
