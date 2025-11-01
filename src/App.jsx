import { useState } from "react";
import "./App.css";

export default function App() {

  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [customTip, setCustomTip] = useState("");

  const handleBillAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setBillAmount(value);
    }
  };

  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setCustomTip(value);
      setTipPercentage(value);
    }
  };

  function handleTipPercentageButton(value) {
  setTipPercentage(value);
  setCustomTip("");
}

  const handleNumberOfPeopleChange = (e) => {
  const value = e.target.value;
  
  if (value === "" || (!isNaN(value) && parseInt(value) >= 0)) {
    setNumberOfPeople(value);
  }
};

  const isValidInput = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);
    
    return !isNaN(bill) && bill > 0 && 
           !isNaN(tip) && tip >= 0 && 
           !isNaN(people) && people > 0;
  };

  const calculateTipPerPerson = () => {
    if (!isValidInput()) return 0;
    
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);
    
    const tipTotal = (bill * tip) / 100;
    return tipTotal / people;
  };

  const calculateTotalPerPerson = () => {
    if (!isValidInput()) return 0;
    
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);
    
    const totalBillWithTip = bill + (bill * tip) / 100;
    return totalBillWithTip / people;
  };

  return (
    <div className="app-container">
      <header className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="87" height="54"><path fill="#3D6666" d="M6.72 17.472c.944 0 1.792-.12 2.544-.36s1.392-.584 1.92-1.032a4.476 4.476 0 001.212-1.62c.28-.632.42-1.34.42-2.124v-.288c0-1.472-.464-2.584-1.392-3.336-.928-.752-2.272-1.288-4.032-1.608a14.615 14.615 0 01-1.74-.408c-.456-.144-.824-.308-1.104-.492-.28-.184-.476-.392-.588-.624a1.771 1.771 0 01-.168-.78c0-.56.232-1.004.696-1.332.464-.328 1.096-.492 1.896-.492.944 0 1.676.248 2.196.744.52.496.78 1.08.78 1.752v.576h3.168v-.864a5 5 0 00-.396-1.968 4.762 4.762 0 00-1.176-1.656C10.436 1.08 9.792.7 9.024.42 8.256.14 7.376 0 6.384 0c-.88 0-1.676.12-2.388.36s-1.32.576-1.824 1.008c-.504.432-.896.94-1.176 1.524-.28.584-.42 1.22-.42 1.908v.144c0 .832.144 1.536.432 2.112a3.978 3.978 0 001.212 1.44c.52.384 1.132.692 1.836.924.704.232 1.48.42 2.328.564.64.112 1.168.248 1.584.408.416.16.744.34.984.54s.408.424.504.672c.096.248.144.508.144.78 0 .576-.232 1.072-.696 1.488-.464.416-1.176.624-2.136.624-1.232 0-2.14-.3-2.724-.9-.584-.6-.876-1.404-.876-2.412v-.576H0v.72c0 .88.144 1.692.432 2.436a5.47 5.47 0 001.272 1.944c.56.552 1.26.984 2.1 1.296.84.312 1.812.468 2.916.468zm22-.336V10.8h3.408c.864 0 1.616-.144 2.256-.432a4.707 4.707 0 001.596-1.14 4.833 4.833 0 00.96-1.608c.216-.6.324-1.212.324-1.836v-.576c0-.608-.108-1.204-.324-1.788a4.625 4.625 0 00-.96-1.56A4.737 4.737 0 0034.384.756c-.64-.28-1.392-.42-2.256-.42h-6.576v16.8h3.168zm3.096-9.36H28.72V3.36h3.096c.704 0 1.26.192 1.668.576.408.384.612.88.612 1.488v.288c0 .608-.204 1.104-.612 1.488-.408.384-.964.576-1.668.576zm29.464 9.36v-3.024h-7.632V.336H50.48v16.8h10.8zm24.88 0v-3.024h-4.032V3.36h4.032V.336H74.928V3.36h4.032v10.752h-4.032v3.024H86.16zm-78.096 36V39.36h4.464v-3.024H.432v3.024h4.464v13.776h3.168zm24.688 0V39.36h4.464v-3.024H25.12v3.024h4.464v13.776h3.168zm28.624 0v-3.024h-7.728v-3.888H60.8V43.2h-7.152v-3.84h7.44v-3.024H50.48v16.8h10.896zm16.744 0V46.8h3.648c.464 0 .796.12.996.36.2.24.3.552.3.936v5.04h3.168v-5.808c0-.56-.164-1.024-.492-1.392-.328-.368-.772-.584-1.332-.648v-.432c.768-.32 1.336-.78 1.704-1.38a3.63 3.63 0 00.552-1.932v-.576c0-.64-.116-1.24-.348-1.8a4.332 4.332 0 00-1.008-1.476c-.44-.424-.988-.756-1.644-.996-.656-.24-1.416-.36-2.28-.36h-6.432v16.8h3.168zm3.024-9.36H78.12V39.36h3.024c.768 0 1.352.204 1.752.612.4.408.6.892.6 1.452v.288c0 .656-.2 1.164-.6 1.524-.4.36-.984.54-1.752.54z"/></svg>
      </header> 
      <main className="main">
         <div className="calculator-settings">
            <div className="input-amount-wrapper">
              <label htmlFor="bill-amount">Bill Amount</label>
              
              <input
                type="number"
                id="bill-amount"
                className="bill-amount"
                value={billAmount}
                onChange={handleBillAmountChange}
                placeholder="0.00"
              />
              <div className="input-prefix-bill">$</div>
            
            </div>
            <div className="tip-percentage-group">
              <label htmlFor="tip-group">Select Tip %</label>
                <div className="tip-group">
                
                  <button
                    type="button"
                    className={`tip-button${tipPercentage === "5" && customTip === "" ? " selected" : ""}`}
                    onClick={() => handleTipPercentageButton("5")}
                  >
                    5%
                  </button>
                  <button
                    type="button"
                    className={`tip-button${tipPercentage === "10" && customTip === "" ? " selected" : ""}`}
                    onClick={() => handleTipPercentageButton("10")}
                  >
                    10%
                  </button>
                  <button
                    type="button"
                    className={`tip-button${tipPercentage === "15" && customTip === "" ? " selected" : ""}`}
                    onClick={() => handleTipPercentageButton("15")}
                  >
                    15%
                  </button>
                  <button
                    type="button"
                    className={`tip-button${tipPercentage === "25" && customTip === "" ? " selected" : ""}`}
                    onClick={() => handleTipPercentageButton("25")}
                  >
                    25%
                  </button>
                  <button
                    type="button"
                    className={`tip-button${tipPercentage === "50" && customTip === "" ? " selected" : ""}`}
                    onClick={() => handleTipPercentageButton("50")}
                  >
                    50%
                  </button>
                  <div className="custom-input-wrapper">
                    {tipPercentage && <span className="input-prefix-percent" aria-hidden="true">%</span>}
                      <input
                        type="number"
                        className="custom-percent"
                        value={tipPercentage}
                        onChange={handleCustomTipChange}        
                        placeholder="Custom"
                  />
                   
                  </div>
              </div>
            </div>
            <div className="number-of-people-group">
              <label htmlFor="number-of-people">Number of People</label>
              <div className="num-of-people-input-wrapper">
              <input
                type="number"
                className="number-of-people"
                id="number-of-people"
                value={numberOfPeople}
                onChange={handleNumberOfPeopleChange}        
                placeholder="1"
                min="1"
                step="1"
              />
              <div className="input-prefix-people">
                 <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16"><path fill="#9EBBBD" d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z"/></svg>
                </div>
              </div>
            </div>
         </div>
         <div className="calculation-results">
            <div className="result-group">
              <div className="result-labels">
                <p className="result-title">Tip Amount</p>
                <p className="per-person-label">/ person</p>
              </div>
              <div className="result-value">
                ${calculateTipPerPerson().toFixed(2)}
              </div>
            </div>
            <div className="result-group">
              <div className="result-labels">
                <p className="result-title">Total</p>
                <p className="per-person-label">/ person</p>
              </div>
              <div className="result-value">
                ${calculateTotalPerPerson().toFixed(2)}
              </div>
            </div>
            <button 
              type="button" 
              className="reset-button" 
              onClick={() => {
                setBillAmount("0");
                setTipPercentage("");
                setCustomTip("");
                setNumberOfPeople("1");
              }}
            >
              RESET
            </button>
         </div>
        </main>   
    </div>
  );
} 