import React, { useState } from 'react';

import { Dropdown } from 'semantic-ui-react'

import currenciesOptions from './currencies-data.json';
import './currency-dropdown-component.css'

function CurrencyDropdown({setvalue, value , onChange , addedClass }) {


  const getValue = (event , data) => {
    console.log(event)
    if(setvalue)
      setvalue(data.value)
    if(onChange)
      onChange(data.value)
  }

  const f = () => console.log("focused")
  return <Dropdown
  placeholder='Select Currency'
  fluid
  selection
  search
  options={currenciesOptions}
  className={'currency-dropdown ' +  addedClass}
  onChange={getValue}
  value={value}
  
/>

}

export default CurrencyDropdown;
