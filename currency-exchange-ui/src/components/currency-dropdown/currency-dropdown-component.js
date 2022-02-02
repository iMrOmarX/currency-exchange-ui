import React, { useState } from 'react';

import { Dropdown } from 'semantic-ui-react'

import currenciesOptions from './currencies-data.json';
import './currency-dropdown-component.css'
function CurrencyDropdown({setvalue}) {


  const getValue = (event , {value}) => {
    setvalue(value)
  }
  return <Dropdown
  placeholder='Select Currency'
  fluid
  selection
  search
  options={currenciesOptions}
  className='currency-dropdown'
  onChange={getValue}
/>

}

export default CurrencyDropdown;
