import {useEffect, useState} from "react";

export const useRoute = () => {
  // Храним в состоянии текущий путь
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    // Вешаем обработчик события popstate на объект window
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, []);

  return path
}

const Router = (props) => {
  // routes - объект с путями, в этом объекте будут пути с соответствующими им
  // компонентами страниц
  const {routes} = props
  // получаем актуальный путь
  const path = useRoute()

  const Page = routes[path] ?? routes['*']

  return <Page />

}

export default Router