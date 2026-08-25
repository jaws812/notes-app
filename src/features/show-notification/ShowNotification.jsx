import {NotesActionsContext, NotesDataContext} from "@/entities/note";
import {useContext} from "react";
import Notification from "@/shared/ui/Notification";

const ShowNotification = () => {
  const {
    hideNotification,
  } = useContext(NotesActionsContext)

  const {
    notificationType,
  } = useContext(NotesDataContext)

  return (
    <div role="status">
      {notificationType === 'show-add' &&
        <Notification
          text="Новая заметка добавлена, но не отображется из-за
        выбранного фильтра."
          onClick={hideNotification}
        />}
    </div>
  )
}

export default ShowNotification