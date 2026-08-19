import {NotesContext} from "@/entities/note";
import {useContext} from "react";
import Notification from "@/shared/ui/Notification";

const ShowNotification = () => {
  const {
    showNotification,
    setShowNotification
  } = useContext(NotesContext)

  return (
    <div role="status">
      {showNotification === 'show' &&
        <Notification onClick={() => setShowNotification(null)} />}
    </div>
  )
}

export default ShowNotification