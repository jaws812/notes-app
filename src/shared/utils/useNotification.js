import {useCallback, useEffect, useRef, useState} from "react";

const useNotification = (time = 4000) => {
  const [showNotification, setShowNotification] = useState(null) // null / 'show'
  const notificationTimer = useRef(null)

  const hideNotification = useCallback(() => {
    setShowNotification(null)
  }, [])

  const showNotificationBadge = useCallback(() => {
    clearTimeout(notificationTimer.current)
    setShowNotification('show')
    notificationTimer.current = setTimeout(() => {
      setShowNotification(null)
    }, time)
  }, [time])

  useEffect(() => {
    return () => clearTimeout(notificationTimer.current)
  }, []);

  return {
    hideNotification,
    showNotificationBadge,
    showNotification,
  }
}

export default useNotification