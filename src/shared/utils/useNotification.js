import {useCallback, useEffect, useRef, useState} from "react";

const useNotification = (time = 4000) => {
  // type: null / 'show-add' / 'add-error' / 'get-all-error' / 'delete-error' / 'toggle-error' / 'delete-all-error'
  const [notificationType, setNotificationType] = useState(null)
  const notificationTimer = useRef(null)

  const hideNotification = useCallback(() => {
    setNotificationType(null)
  }, [])

  const showNotification = useCallback((type) => {
    clearTimeout(notificationTimer.current)
    setNotificationType(type)
    notificationTimer.current = setTimeout(() => {
      setNotificationType(null)
    }, time)
  }, [time])

  useEffect(() => {
    return () => clearTimeout(notificationTimer.current)
  }, []);

  return {
    hideNotification,
    showNotification,
    notificationType,
  }
}

export default useNotification