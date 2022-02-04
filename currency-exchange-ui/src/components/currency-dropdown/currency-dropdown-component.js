import React, { useState } from 'react';

import { Dropdown } from 'semantic-ui-react'

import currenciesOptions from './currencies-data.json';
import './currency-dropdown-component.css'

function CurrencyDropdown({setvalue, value , onChange}) {


  const getValue = (event , data) => {
    setvalue(data.value)
    if(onChange)
      onChange(data.value)
  }
  return <Dropdown
  placeholder='Select Currency'
  fluid
  selection
  search
  options={currenciesOptions}
  className='currency-dropdown'
  onChange={getValue}
  value={value}
/>

}

export default CurrencyDropdown;
