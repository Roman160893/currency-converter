import React from 'react';

const Header = ({ fromPrice, fromCurrency, toPrice, toCurrency }) => {
   return (
      <div className='header'>
         Конвертер валют
         <h2> {`${fromPrice} ${fromCurrency} = ${toPrice} ${toCurrency}`} </h2>
      </div>
   );
};

export default Header;