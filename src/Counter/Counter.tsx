import { ChangeEvent, useState } from 'react'
import { Button } from '../Componet/Button'
import { Display } from '../Componet/Display'
import { Input } from '../Componet/Input'

export const Counter = () => {
  let [counter, setCounter] = useState<number>(0)
  let [startValue, setStartValue] = useState(0)
  let [maxValue, setMaxValue] = useState(0)
  let [error, setError] = useState('')

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

  //добавляем в local storage значения
  const setLocalStorage = () => {
    localStorage.setItem('StartValue', JSON.stringify(startValue))
    localStorage.setItem('MaxValue', JSON.stringify(maxValue))
  }
  // сохраняем значения нажав на кнопку
  const onClickSaveHandler = () => {
    setLocalStorage()
    setError('')
    setCounter(startValue)
  }

  //стили для табло

  const onClickInc = () => {
    setCounter(counter + 1)
  }
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
            name={'start value:'}
            maxValue={maxValue}
            startValue={startValue}
            onFocus={onFocusHandler}
            onBlur={onFocusHandler}
            onChange={onChangeStartValueHandler}
          />
          <br />
          <Input
            name={'max value:'}
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
