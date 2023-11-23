import { useState } from "react";

import InputBox from "./components/InputBox"
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div 
      className="bg-cover bg-no-repeat w-full h-screen "
      style={{backgroundImage: `url('https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}
    >
      <h1 className="text-white text-2xl font-bold text-center p-5">Currency Converter</h1>
      <div className=" w-full flex items-center justify-center mt-10 p-5 rounded-lg max-w-xl bg-slate-300 m-auto border-4 border-white">

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert()

          }}
          className="w-full max-w-lg flex flex-col flex-wrap items-center justify-center "
        >
          <div className="w-full my-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setAmount(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <div className="relative w-full h-0.5 flex items-center justify-center">
            <button 
              type="button"
              className="bg-blue-500 py-2 px-6 ring-2 rounded-lg hover:bg-blue-400"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className=" w-full my-4">
            <InputBox 
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button className="w-full bg-blue-500 py-2 px-6 ring-2 rounded-lg hover:bg-blue-400">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default App
