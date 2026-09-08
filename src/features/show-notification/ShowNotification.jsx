import {NotesActionsContext, NotesDataContext} from "@/entities/note";
import {useContext} from "react";
import Notification from "@/shared/ui/Notification";

const textMessages = {
  'show-add': 'Новая заметка добавлена, но не отображется из-за выбранного фильтра.',
  'add-error': 'Добавить заметку не удалось, проблемы с сервером.',
  'delete-error': 'Не удалось удалить задачу, проблемы с сервером.',
  'toggle-error': 'Не удалось переключить состояние заметки, проблемы с сервером.',
  'delete-all-error': 'Не удалось удалить все заметки, проблемы с сервером.',
  'edit-error': 'Не удалось отредактировать заметку, проблемы с сервером.',
}

const ShowNotification = () => {
  const {
    hideNotification,
  } = useContext(NotesActionsContext)

  const {
    notificationType,
  } = useContext(NotesDataContext)

  return (
    <div role="status">
      {notificationType !== null &&
        <Notification
          text={textMessages[notificationType]}
          isErrorMessage={notificationType !== "show-add"}
          onClick={hideNotification}
        />}
    </div>
  )
}

export default ShowNotification