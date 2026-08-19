import {NotesContext} from "@/entities/note";
import {useContext} from "react";
import Notification from "@/shared/ui/Notification";

const ShowNotification = () => {
  const {
    showNotification,
    hideNotification,
  } = useContext(NotesContext)

  return (
    <div role="status">
      {showNotification === 'show' &&
        <Notification
          text="Новая заметка добавлена, но не отображется из-за
        выбранного фильтра."
          onClick={hideNotification}
        />}
    </div>
  )
}

export default ShowNotification