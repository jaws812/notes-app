import {useCallback, useEffect, useRef, useState} from "react";
import type {NotificationType} from './types'

const useNotification = (time = 4000) => {
  const [notificationType, setNotificationType] = useState<NotificationType>(null)
  const notificationTimer = useRef<number | null>(null)

  const hideNotification = useCallback(() => {
    setNotificationType(null)
  }, [])

  const showNotification = useCallback((type: NotificationType) => {
    if (notificationTimer.current !== null) {
      clearTimeout(notificationTimer.current)
    }
    setNotificationType(type)
    notificationTimer.current = setTimeout(() => {
      setNotificationType(null)
    }, time)
  }, [time])

  useEffect(() => {
    return () => {
      if (notificationTimer.current !== null) {
        clearTimeout(notificationTimer.current)
      }
    }
  }, []);

  return {
    hideNotification,
    showNotification,
    notificationType,
  }
}

export default useNotification