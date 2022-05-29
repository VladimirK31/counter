import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from '../Component/Button'
import { Display } from '../Component/Display'
import { Input } from '../Component/Input'

export const Counter = () => {
  let [counter, setCounter] = useState<number>(0)
  let [startValue, setStartValue] = useState(0)
  let [maxValue, setMaxValue] = useState(0)
  let [error, setError] = useState('')

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  useEffect(() => {
    setToLocalStorage()
  }, [counter])

  //устанавливаем стартовое значение в инпуте
  const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    if (Number.isInteger(+value)) {
      setStartValue(Number(value))
    }
  }

  //устанавливаем максимальное значение в инпуте
  const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    if (Number.isInteger(+value)) {
      setMaxValue(Number(value))
    }
  }
  const onClickInc = () => {
    setCounter(counter + 1)
  }
  //добавляем в local storage значения
  const setToLocalStorage = () => {
    localStorage.setItem('StartValue', JSON.stringify(startValue))
    localStorage.setItem('MaxValue', JSON.stringify(maxValue))
    localStorage.setItem('CounterValue', JSON.stringify(counter))
  }
  const getFromLocalStorage = () => {
    let getStartValue = localStorage.getItem('StartValue')
    if (getStartValue) {
      setStartValue(JSON.parse(getStartValue))
    }
    let getMaxValue = localStorage.getItem('MaxValue')
    if (getMaxValue) {
      setMaxValue(JSON.parse(getMaxValue))
    }
    let getCounterValue = localStorage.getItem('CounterValue')
    if (getCounterValue) {
      setCounter(JSON.parse(getCounterValue))
    }
  }

  // сохраняем значения нажав на кнопку
  const onClickSaveHandler = () => {
    setToLocalStorage()
    setError('')
    setCounter(startValue)
  }

  //стили для табло

  const onClickReset = () => {
    let getValue = localStorage.getItem('StartValue')
    if (getValue) {
      setCounter(JSON.parse(getValue))
    }
  }

  const onFocusHandler = () => {
    setError('enter values and press "save"')
  }

  return (
    <div className="v1">
      <div className="wrapper">
        <div className="display">
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <Display
              maxValue={maxValue}
              startValue={startValue}
              counter={counter}
            />
          )}
        </div>
        <span className="buttContainer">
          <Button
            name={'Inc'}
            callback={onClickInc}
            disabled={error ? true : false || counter === maxValue}
          />
          <Button
            name={'Reset'}
            disabled={error ? true : false || counter === startValue}
            callback={onClickReset}
          />
        </span>
      </div>
      <div className="wrapper">
        <div className="display">
          <Input
            value={startValue}
            name={'start value :'}
            maxValue={maxValue}
            startValue={startValue}
            onFocus={onFocusHandler}
            onBlur={onFocusHandler}
            onChange={onChangeStartValueHandler}
          />
          <br />
          <Input
            value={maxValue}
            name={'max value :'}
            maxValue={maxValue}
            startValue={startValue}
            onFocus={onFocusHandler}
            onBlur={onFocusHandler}
            onChange={onChangeMaxValueHandler}
          />
        </div>
        <span className="buttContainer">
          <Button
            callback={onClickSaveHandler}
            disabled={startValue >= maxValue || startValue < 0}
            name={'Save'}
          />
        </span>
      </div>
    </div>
  )
}
