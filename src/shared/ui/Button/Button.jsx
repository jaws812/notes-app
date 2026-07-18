import s from './Button.module.scss'

const Button = (props) => {
  const {
    className,
    children,
    type="button",
    title,
    onDeleteAllButtonClick,
  } = props

  return (
    <button
      className={`${s.button} ${className}`}
      type={type}
      title={title}
      aria-label={title}
      onClick={onDeleteAllButtonClick}
    >
      {title}
      {children}
    </button>
  )
}

export default Button