import s from './Button.module.scss'

const Button = (props) => {
  const {
    className,
    type="button",
    title,
  } = props

  return (
    <button
      className={`${s.button} ${className}`}
      type={type}
    >
      {title}
    </button>
  )
}

export default Button