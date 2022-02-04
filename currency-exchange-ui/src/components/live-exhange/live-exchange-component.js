import React, { useEffect, useState } from 'react';
import ToggleButton from 'react-toggle-button'

import CurrencyDropdown from '../currency-dropdown/currency-dropdown-component';
import "./live-exchange-component.css"
function LiveExhnage() {

    
    const [data, setdata] = useState([]);

    const [baseCurrency, setbaseCurrency] = useState("USD");
    const [currencies, setcurrencies] = useState(["EUR", "ILS"]);
    
    const [historyData, sethistoryData] = useState({});
    
    const [toggleInverse, settoggleInverse] = useState(false);

    const fetchData = async (currency = "USD") => {
        
            function getYesterdayDate() {
                let s = new Date(new Date().getTime() - 24*60*60*1000);
                
                return s.getFullYear() + '-' + ((s.getMonth()<10)? ('0'+ (s.getMonth()+1)): (s.getMonth()+1)) + '-' + ((s.getDate() < 10)? '0'+ s.getDate() : s.getDate());
            }
            
            try {
                const jsonData = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=92b962e0-8460-11ec-a770-697cd1f97345&base_currency=${currency}`)
                const result = await jsonData.json()
                setdata(result.data)

                const jsonHistoryData = await fetch(`https://freecurrencyapi.net/api/v2/historical?apikey=92b962e0-8460-11ec-a770-697cd1f97345&base_currency=${currency}&date_from=${getYesterdayDate()}`)
                console.log(`https://freecurrencyapi.net/api/v2/historical?apikey=92b962e0-8460-11ec-a770-697cd1f97345&base_currency=${currency}&date_from=${getYesterdayDate()}`)
                const resultHistory = await jsonHistoryData.json()
                
                sethistoryData(resultHistory.data)
            }
            catch(e) {
                console.log(e)
            }
            
        }
    useEffect(() => {
        

        fetchData()
    }, []);

    const showChangeRate = (curr) => {
        if(!historyData || Object.keys(historyData).length ===0 ) {
            return ""
        }
        const before = historyData[Object.keys(historyData)[0]][curr] 
        const after = historyData[Object.keys(historyData)[1]][curr]

        const per = (((after - before)/ before) *100);
        return ((per < 0 )? "-":"") +  '%' + Math.abs(per.toFixed(2))
    }

    const loadData = (curr) => {
        fetchData(curr)
    }
    
    const addNewCurrency = (newCurrency) => {
        setcurrencies([...currencies , newCurrency]);
    }

    return <section className='live-exhange-section'>
        
        <h2>Live Exchange</h2>
        <table class="ui celled table exhange-table">
            <thead>
                <tr>
                    <th>Inverse 
                    <ToggleButton
                        value={ toggleInverse }
                        onToggle={(value) => {
                            settoggleInverse(!value)
                    }} /></th> 
                    <th>Amount</th>
                    <th>Change(24h)</th>
                    <th>Chart(24h)</th>
                    <th data-label="btn"><button className='edit-btn'>Edit</button></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th data-label="Name"><CurrencyDropdown setvalue={setbaseCurrency} value={baseCurrency} onChange={loadData}></CurrencyDropdown></th> 
                    <th data-label="Amount">{toggleInverse? "Inverse" : 1}</th>
                </tr>

                {currencies.map((curr) => {
                    return <tr>
                        <th data-label="Name">{curr}</th> 
                        <th data-label="Amount">{(data[curr])? (toggleInverse)? (1 / data[curr]).toFixed(3) + " " + baseCurrency:  data[curr]: ""}</th>
                        <th data-label="Change(24h)">{showChangeRate(curr)}</th>
                        <th data-label="Chart(24h)"></th>

                        <th data-label="btn"><button>Send</button></th>
                    </tr>
                })}


                
                <CurrencyDropdown onChange={addNewCurrency}></CurrencyDropdown>
            </tbody>
        </table>
    </section>;
}

export default LiveExhnage;
