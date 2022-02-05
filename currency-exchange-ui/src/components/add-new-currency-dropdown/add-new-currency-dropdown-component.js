import React from 'react';
import {Button} from 'semantic-ui-react';
import CurrencyDropdown from '../currency-dropdown/currency-dropdown-component';

function AddNewCurrencyDropDown({setshowAddNewCurrencyDropdown, showAddNewCurrencyDropdown, addNewCurrency, currencies, baseCurrency}) {
    
    return <Button size='large' className='currency-dropdown-btn'>
        <Button
            size='large'
            className='currency-dropdown-btn add-new-currency-btn'
            onClick={() => {
            setshowAddNewCurrencyDropdown(true)
        }}
            style={{
            display: showAddNewCurrencyDropdown
                ? "none"
                : "block"
        }}>Add New Currency</Button>
        {showAddNewCurrencyDropdown && <CurrencyDropdown
            onChange={addNewCurrency}
            addedClass={"add-new-currency-dropdown"}
            clickToFocus={showAddNewCurrencyDropdown}
            removedOptionsValues={[
            ...currencies,
            baseCurrency
        ]}></CurrencyDropdown>}
    </Button>;
}

export default AddNewCurrencyDropDown;
