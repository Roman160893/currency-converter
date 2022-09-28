import { useEffect, useRef, useState } from 'react';
import './reserAppStyle.css';
import Form from './Components/Form/Form';
import Header from './Components/Form/Header/Header';

function App() {

  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)

  const rates = useRef({})

  async function getRets() {
    const req = await fetch('https://cdn.cur.su/api/latest.json');
    const res = await req.json()
      .then((json) => {
        rates.current = json.rates;
        onChangeToPrice(1)
      }).catch(err => {
        console.warn(err);
        alert('Не вдалося отримати інформацію')
      })
  }

  useEffect(() => {
    getRets()
  }, [])

  function onChangeFromPrice(value) {
    const price = value / rates.current[fromCurrency];
    const result = price * rates.current[toCurrency]
    setFromPrice(value)
    setToPrice(result.toFixed(2))
  }

  function onChangeToPrice(value) {
    const result = (rates.current[fromCurrency] / rates.current[toCurrency]) * value
    setFromPrice(result.toFixed(2))
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className='wrapper'>
      <Header
        fromPrice={fromPrice}
        fromCurrency={fromCurrency}
        toPrice={toPrice}
        toCurrency={toCurrency}
      />
      <div>
        <Form
          value={fromPrice}
          currency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e)}
          onChangeValue={onChangeFromPrice} />
        <Form
          value={toPrice}
          currency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e)}
          onChangeValue={onChangeToPrice} /></div>

    </div>
  );
}

export default App;
