import Button from "@/shared/ui/Button";
import css from './Notification.module.scss'

const Notification = (props) => {

  const {
    onClick,
    text,
  } = props

  return (
    <div className={css.notification}>
      <div className={css.text}>{text}</div>
      <Button
        className={css.button}
        onClick={onClick}
      >Закрыть</Button>
    </div>
  )
}

export default Notification