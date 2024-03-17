import { useState } from "react";
import "./styles/style.css";
import "./styles/style_responsive.css"

/**
 * Thanks to: https://stackoverflow.com/questions/64427425/how-do-i-document-usestate-hooks-with-jsdoc#:~:text=I%20would%20create%20a%20generic%20type%20that%20equals%20the%20same%20return%20type%20as%20React%27s%20useState%20function
 * @template T
 * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} useState
 */


/**
 * 
 * @param {number} bill
 * @param {number} tipPercentage
 * @param {number} numberOfPeople 
 * @returns {number[]} array containing tip per person and total per person (includes tip). If any of parameters is less than zero returns [0, 0].
 */
function calculateBillPerPerson(bill, tipPercentage, numberOfPeople) {
  if (bill > 0 && tipPercentage > 0 && numberOfPeople > 0) {}
  else { return [0, 0]; }

  tipPercentage /= 100;

  const tipPerPerson = (bill * tipPercentage) / numberOfPeople;
  const totalPerPerson = (bill / numberOfPeople) + tipPerPerson;

  return [Number(tipPerPerson.toFixed(2)), Number(totalPerPerson.toFixed(2))];
}

/**
 * @callback onValueChange
 * @param {number} value
 * @returns {void}
 */

/**
 * @param {Object} props
 * @param {string | undefined} props.label
 * @param {string | undefined} props.leadingIcon
 * @param {number | undefined} props.value
 * @param {string | undefined} props.placeholder
 * @param {string | undefined} props.error
 * @param {onValueChange} props.onValueChange
 * @returns 
 */
function TipCardInput({ 
  label, 
  leadingIcon, 
  value, 
  placeholder, 
  error,
  onValueChange 
}) {
  return (
    <div className="tip-card__input-wrapper">
      {label && <label className="tip-card__input-label">{label}</label>}
      {error && <span className="tip-card__input-error">{error}</span>}
      {leadingIcon && <img className="tip-card__input-leading-icon" src={leadingIcon} alt="" />}
      <input
        className="tip-card__input"
        type="number"
        value={value >= 0 ? value : ""} 
        placeholder={placeholder} 
        onChange={e => { 
          const number = e.target.value === "" ? undefined : Number(e.target.value);
          
          onValueChange(number);
        }}
      />
    </div>
  );
}

/**
 * @callback onTipPercentageChange
 * @param {number} value
 * @returns {void}
 */

/**
 * @param {Object} props
 * @param {number} props.selectedTip
 * @param {number[]} props.tipPercentages[]
 * @param {onTipPercentageChange} props.onTipPercentageChange
 * @returns 
 */
function SelectTip({ 
  selectedTip, 
  tipPercentages, 
  onTipPercentageChange 
}) {
  return (
    <>
      {
        tipPercentages.map(v => {
          let percentButtonClass = "select-tip__percent-button select-tip__percent-button--hovered";

          if (selectedTip === v) {
            percentButtonClass += " select-tip__percent-button--selected";
          }

          return <button
            className={percentButtonClass}
            type="button"
            key={v}
            onClick={() => onTipPercentageChange(v)}
          >{v}%</button>
        })
      }
    </>
  );
}

/**
 * @callback onReset
 * @returns {void}
 */

/**
 * 
 * @param {Object} props
 * @param {number} props.tipAmount
 * @param {number} props.total
 * @param {boolean} props.resetBtnDisabled
 * @param {onReset} props.onReset
 * @returns 
 */
function TipSummary({ 
  tipAmount = 0, 
  total = 0, 
  onReset, 
  resetBtnDisabled = false 
}) {
  let resetButtonClasses = "tip-summary__reset-button";

  if (resetBtnDisabled) {
    resetButtonClasses += " tip-summary__reset-button--disabled";
  } else {
    resetButtonClasses += " tip-summary__reset-button--hovered";
  }

  return (
    <section className="tip-summary tip-card__tip-summary">
      <div className="tip-summary__tip-wrapper">
        <span className="tip-summary__label tip-summary__label--white">Tip Amount</span>
        <span className="tip-summary__small tip-summary__small--gray">/ person</span>
        <span className="tip-summary__tip tip-summary__tip--dark-cyan">
          <span className="tip-summary__dollar-icon">$</span>
          {tipAmount === 0 ? "0.00" : tipAmount}
        </span>
      </div>

      <div className="tip-summary__tip-wrapper">
        <span className="tip-summary__label tip-summary__label--white">Total</span>
        <span className="tip-summary__small tip-summary__small--gray">/ person</span>
        <span className="tip-summary__tip tip-summary__tip--dark-cyan">
          <span className="tip-summary__dollar-icon">$</span>
          {total === 0 ? "0.00" : total}
        </span>
      </div>

      <button 
        type="button" 
        className={resetButtonClasses}
        disabled={resetBtnDisabled}
        onClick={onReset}
      >Reset</button>
   </section>
  );
}

export default function App() {
  const tipPercentages = [5, 10, 15, 25, 50];

  /** @type {useState<number | undefined>} */
  const [bill, setBill] = useState(undefined);
  
  /** @type {useState<number | undefined>} */
  const [selectedTip, setSelectedTip] = useState(undefined);
  
  /** @type {useState<number | undefined>} */
  const [customTip, setCustomTip] = useState(undefined);

  /** @type {useState<number | undefined>} */
  const [numberOfPeople, setNumberOfPeople] = useState(undefined);

  const tip = selectedTip ? selectedTip : customTip;  
  const [tipPerPerson, totalPerPerson] = calculateBillPerPerson(bill, tip, numberOfPeople);

  function resetHandler() {
    setBill(undefined);
    
    if (selectedTip) {
      setSelectedTip(undefined);
    } 
    
    if (customTip) {
      setCustomTip(undefined);
    }

    setNumberOfPeople(undefined);
  }

  return (
    <main className="main">
      <img className="logo" src="logo.svg" alt="Splitter logo" />

      <section className="tip-card main__tip-card">
        <form className="tip-card__form">
          <TipCardInput
            label="Bill" 
            leadingIcon="icon-dollar.svg" 
            value={bill}
            placeholder="0"
            onValueChange={setBill}
          />

          <div className="select-tip tip-card__select-tip">
            <div className="select-tip__label select-tip__label--gray">Select Tip %</div>
            <div className="select-tip__grid">
              <SelectTip 
                tipPercentages={tipPercentages} 
                selectedTip={selectedTip}
                onTipPercentageChange={v => {
                  if (customTip) {
                    setCustomTip(undefined);
                  }

                  setSelectedTip(v);
                }}
              />

              <TipCardInput 
                placeholder="Custom"
                value={customTip}
                onValueChange={v => {
                  if (selectedTip) {
                    setSelectedTip(undefined);
                  }

                  setCustomTip(v);
                }}
              />
            </div>
          </div>

          <TipCardInput
            label="Number of People" 
            leadingIcon="icon-person.svg" 
            value={numberOfPeople}
            placeholder="0"
            error={numberOfPeople === 0 ? "Can't be zero" : ""}
            onValueChange={setNumberOfPeople} 
          />
        </form>

        <TipSummary
          tipAmount={tipPerPerson}
          total={totalPerPerson}
          resetBtnDisabled={!bill || !(selectedTip || customTip) || (!numberOfPeople || numberOfPeople < 0)}
          onReset={resetHandler}
        />
      </section>

      <div className="attribution">
          Challenge by <a className="attribution__challenge-link" href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a className="attribution__github-link" href="https://github.com/h0ldemslav">h0ldemslav</a>.
      </div>
    </main>
  );
}