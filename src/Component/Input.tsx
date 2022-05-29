import { ChangeEvent } from 'react'

type InputType = {
  name: string
  maxValue: number
  startValue: number
  onFocus: () => void
  onBlur: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: number
}

export const Input = (props: InputType) => {
  const spanError =
    props.maxValue < props.startValue ||
    props.maxValue < 0 ||
    props.startValue < 0
      ? 'spanError'
      : 'spanDefault'
  //стили инпута
  const inputError =
    props.maxValue < props.startValue ||
    props.maxValue < 0 ||
    props.startValue < 0
      ? 'inputSetError'
      : 'inputSet'

  return (
    <span className={spanError}>
      {props.name}
      <input
        value={props.value}
        type={'number'}
        max={100}
        className={inputError}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
    </span>
  )
}
