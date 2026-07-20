import s from './Button.module.scss'

const Button = (props) => {
  const {
    className='',
    children,
    type = "button",
    title,
    allWidth,
    onClick,
  } = props

  return (
    <button
      className={`${s.button} ${className} ${allWidth ? s.width : ''}`}
      type={type}
      title={title}
      aria-label={title}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button