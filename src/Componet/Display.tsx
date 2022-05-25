type DisplayType = {
  counter: number
  maxValue: number
  startValue: number
}

export const Display = (props: DisplayType) => {
  const displayStyle =
    props.counter === props.maxValue ? 'displayMax' : 'displayDefault'
  return <div className={displayStyle}>{props.counter}</div>
}
