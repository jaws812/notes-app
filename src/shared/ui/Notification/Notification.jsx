import Button from "@/shared/ui/Button";
import css from './Notification.module.scss'

const Notification = (props) => {

  const {
    onClick,
  } = props

  return (
    <div className={css.notification}>
      <div className={css.text}>Новая заметка добавлена, но не отображется из-за
        выбранного фильтра.
      </div>
      <Button className={css.button} onClick={onClick}>Закрыть</Button>
    </div>
  )
}

export default Notification