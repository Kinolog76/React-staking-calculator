import { useState, useEffect } from 'react';
import { Input } from './Input';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { Label } from './Label';

export default function StakingCalculator() {
  const [amount, setAmount] = useState('');
  const [coinPrice, setCoinPrice] = useState('');
  const [apy, setApy] = useState('');
  const [futurePrice, setFuturePrice] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculate();
  }, [amount, coinPrice, apy, futurePrice, days]);

  const handleNumericInput = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const formatNumber = (number, decimals = 2) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number);
  };

  const calculate = () => {
    const amountNum = parseFloat(amount) || 0;
    const coinPriceNum = parseFloat(coinPrice) || 0;
    const apyNum = parseFloat(apy) || 0;
    const futurePriceNum = parseFloat(futurePrice) || 0;
    const daysNum = parseFloat(days) || 0;

    if (!amount && !coinPrice && !futurePrice) {
      return;
    }

    const coins = coinPriceNum > 0 ? amountNum / coinPriceNum : 0;
    const periodRate = (apyNum / 100 / 365) * daysNum;
    const coinsWithStake = coins * (1 + periodRate);
    const finalValue = coinsWithStake * futurePriceNum;
    const profit = finalValue - amountNum;

    const dailyRate = apyNum / 100 / 365;
    const dailyCoins = coins * dailyRate;
    const dailyDollars = dailyCoins * futurePriceNum;

    setResult({ coins, coinsWithStake, finalValue, profit, dailyCoins, dailyDollars });
  };

  return (
    <div className='flex flex-col justify-start items-center min-h-screen bg-gray-900 p-4 space-y-6'>
      <Card className='w-full max-w-md shadow-xl rounded-2xl'>
        <CardContent className='space-y-4 p-4'>
          <h2 className='text-xl font-bold text-center text-white'>Crypto Staking Calculator</h2>

          <div className='space-y-2'>
            <Label>💰 Ваша сумма ($)</Label>
            <Input value={amount} onChange={handleNumericInput(setAmount)} />
          </div>

          <div className='space-y-2'>
            <Label>📈 Текущая цена монеты ($)</Label>
            <Input value={coinPrice} onChange={handleNumericInput(setCoinPrice)} />
          </div>

          <div className='space-y-2'>
            <Label>📊 Процент стейкинга (APY %)</Label>
            <Input value={apy} onChange={handleNumericInput(setApy)} />
          </div>

          <div className='space-y-2'>
            <Label>📅 Период стейкинга (дни)</Label>
            <Input value={days} onChange={handleNumericInput(setDays)} />
          </div>

          <div className='space-y-2'>
            <Label>🚀 Будущая цена монеты ($)</Label>
            <Input value={futurePrice} onChange={handleNumericInput(setFuturePrice)} />
          </div>

          {result && (
            <div className='mt-6 space-y-4 text-white bg-gray-800 p-2.5 rounded-xl shadow'>
              <div className='space-y-2'>
                <p>
                  🔹 Куплено монет: <b>{formatNumber(result.coins, 4)}</b>
                </p>
                <p>
                  🔹 С учётом стейкинга: <b>{formatNumber(result.coinsWithStake, 4)}</b>
                </p>
                <p>
                  💵 Финальная сумма: <b>{formatNumber(result.finalValue)} $</b>
                </p>
                <p>
                  ✅ Прибыль: <b>{formatNumber(result.profit)} $</b>
                </p>
                <p>
                  📆 В день капает: <b>{formatNumber(result.dailyCoins, 6)} </b> ≈
                  <b>{formatNumber(result.dailyDollars)} $</b>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
