import {useNotesActions, useNotesData} from "@/entities/note";
import Notification from "@/shared/ui/Notification";
import type {NotificationType} from "@/shared/utils/types"

const textMessages: Record<NotificationType, string> = {
  'show-add': 'Новая заметка добавлена, но не отображется из-за выбранного фильтра.',
  'add-error': 'Добавить заметку не удалось, проблемы с сервером.',
  'delete-error': 'Не удалось удалить задачу, проблемы с сервером.',
  'toggle-error': 'Не удалось переключить состояние заметки, проблемы с сервером.',
  'delete-all-error': 'Не удалось удалить все заметки, проблемы с сервером.',
  'get-all-error': 'Ошибка, проблемы с сервером.',
  'edit-error': 'Ошибка, проблемы с сервером.',
}

const ShowNotification = () => {
  const {
    hideNotification,
  } = useNotesActions()

  const {
    notificationType,
  } = useNotesData()

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