import s from './Button.module.scss'
import type {MouseEventHandler, ReactNode} from "react";

type ButtonType = "button" | "submit" | "reset"

interface ButtonProps {
  className?: string;
  children: ReactNode;
  type?: ButtonType;
  title?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: ButtonProps) => {
  const {
    className = '',
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