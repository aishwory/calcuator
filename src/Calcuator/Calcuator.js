import React, { useState } from 'react';
import './Calcuator.css';

const Calcuator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isBracketOpen, setIsBracketOpen] = useState(false); // For tracking the bracket state

  const buttons = [
    ["C", "()", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+", "<--"],
    ["±", "0", ".", "="]
  ];

  const handleClick = (value) => {
    if (value === "=") {
      try {
        // Evaluate percentage and negative sign handling
        const finalInput = input
          .replace(/(\d+)%/g, '($1/100)') // Handle percentage
          .replace(/--/g, '+') // Handle double negative signs
          .replace(/\+-/g, '-') // Handle +/- combinations
          .replace(/-\+/g, '-'); // Handle -/+ combinations

        setResult(new Function('return ' + finalInput)());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput('');
      setResult('');
    } else if (value === "<--") {
      setInput(input.slice(0, -1));
    } else if (value === "%") {
      setInput(input + '%');
    } else if (value === "()") {
      if (isBracketOpen) {
        setInput(input + ')');
        setIsBracketOpen(false);
      } else {
        setInput(input + '(');
        setIsBracketOpen(true);
      }
    } else if (value === "±") {
      if (input) {
        setInput(input.includes('-') ? input.replace(/-/, '') : '-' + input);
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator">
      <div className="screen">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="button-box">
        {buttons.flat().map((btn, i) => (
          <button key={i} className="button" onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calcuator;
