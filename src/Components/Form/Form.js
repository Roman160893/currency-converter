import React from 'react';
import './Form.css'

const Form = ({ value, currency, onChangeValue, onChangeCurrency }) => {
   return (
      <div className='form'>
         <input
            onChange={(e) => onChangeValue(e.target.value)}
            value={value}
         />
         <select onChange={(e) => onChangeCurrency(e.target.value)} defaultValue={currency}>
            <option value='UAH'> UAH </option>
            <option value='USD'> USD </option>
            <option value='EUR'> EUR</option>
         </select>
      </div>
   );
};

export default Form;