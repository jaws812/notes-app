import s from './Button.module.scss'

const Button = (props) => {
  const {
    className='',
    children,
    type = "button",
    title,
    fullWidth,
    isDisabled,
    onClick,
  } = props

  return (
    <button
      className={`${s.button} ${className} ${fullWidth ? s.width : ''}`}
      type={type}
      disabled={isDisabled}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button