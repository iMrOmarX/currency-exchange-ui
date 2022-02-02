import React , {useState} from 'react';
import CurrencyDropdown from '../currency-dropdown/currency-dropdown-component';
import './convert-section-component.css'
import { FaExchangeAlt } from 'react-icons/fa';


function ConvertSection() {

  const [showResult, setshowResult] = useState(false);

  const [fromCurrency, setfromCurrency] = useState(null);
  const [toCurrency, settoCurrency] = useState(null);


  const convertCurrency = async () => {
    if(fromCurrency === null || toCurrency === null){
      return
    }

    const jsonData = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=92b962e0-8460-11ec-a770-697cd1f97345&base_currency=${fromCurrency}`)

    const data = await jsonData.json()

    console.log(data)
    setshowResult(true);
  }
  return <div id="convert-section">
    <div className='convert-input-section'>
      <div id="amount-field" className='field'>
          <label><b>Amount</b></label>
          <input type="text" className='amount-input-field ui fluid'/>
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
        sdafdsfdsafdsfasddsa
      </div>
  </div>;
}

export default ConvertSection;
