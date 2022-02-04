import React , {useState} from 'react';
import CurrencyDropdown from '../currency-dropdown/currency-dropdown-component';
import './convert-section-component.css'
import { FaExchangeAlt } from 'react-icons/fa';


function ConvertSection() {

  const [showResult, setshowResult] = useState(false);

  const [fromCurrency, setfromCurrency] = useState(null);
  const [toCurrency, settoCurrency] = useState(null);

  const [amount, setamount] = useState(-1);

  const [conversionValue, setconversionValue] = useState(0);

  const [isInvalidInput, setisInvalidInput] = useState(false);

  const convertCurrency = async () => {
    if(fromCurrency === null || toCurrency === null){
      return
    }

    const jsonData = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=92b962e0-8460-11ec-a770-697cd1f97345&base_currency=${fromCurrency}`)

    const result = await jsonData.json()

    setconversionValue(result.data[toCurrency]);
    
    setshowResult(true);



  }

  const updateInput = (e) => {
    let newValue = parseFloat(e.target.value);

    if(isNaN(newValue)) {
      setisInvalidInput(true)
    }
    else {
      setisInvalidInput(false)
      setamount(newValue)
    }
  }
  return <div id="convert-section">
    <div className='convert-input-section'>
      <div id="amount-field" className='field'>
          <label><b>Amount</b></label>
          <input type="text" className='amount-input-field ui fluid' onChange={updateInput}/>
          <p className='invalid-error-message' style={{
            display:(isInvalidInput)? "block" : "none",
            color:"red",
            alignSelf: "self-start"
          }}>Please Input a valid amount</p>
        </div>

        <div id="from-currency-field" className='field'>
          <label><b>From</b></label>
          <CurrencyDropdown className="currency-dropdown" setvalue={setfromCurrency}></CurrencyDropdown>
        </div>

        <button className='switch-btn field'>
          <FaExchangeAlt></FaExchangeAlt>
        </button>
        <div id="to-currency-field" className='field'>
          
          <label><b>To</b></label>
          <CurrencyDropdown className="currency-dropdown" setvalue={settoCurrency}></CurrencyDropdown>
          
          <button className='convert-btn field' onClick={convertCurrency}>Convert</button>
        </div>

    </div>
      

      <div className='result-section' style={{
        display:(showResult)? "flex" : "none"
      }}> 
        {amount} {fromCurrency} = <span className='output-conversion'> {amount * conversionValue} {toCurrency}</span>

        
      </div>
  </div>;
}

export default ConvertSection;
