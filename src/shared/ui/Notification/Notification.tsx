import Button from "@/shared/ui/Button";
import css from './Notification.module.scss'
import type {MouseEventHandler} from "react";

interface NotificationProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  isErrorMessage: boolean;
}

const Notification = (props: NotificationProps) => {

  const {
    onClick,
    text,
    isErrorMessage,
  } = props

  return (
    <div className={`${css.notification} ${isErrorMessage ? css.notificationError : ''}`}>
      <div className={css.text}>{text}</div>
      <Button
        className={`${css.button} ${isErrorMessage ? css.buttonError : ''}`}
        onClick={onClick}
      >Закрыть</Button>
    </div>
  )
}

export default Notification