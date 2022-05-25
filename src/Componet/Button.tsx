type ButtonType = {
  name: string
  disabled: boolean
  callback: () => void
}

export const Button = (props: ButtonType) => {
  return (
    <button className="butt" disabled={props.disabled} onClick={props.callback}>
      {props.name}
    </button>
  )
}
