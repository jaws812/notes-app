import {useEffect, useState} from "react";

const matchPath = (path, route) => {
  const pathParts = path.split('/')
  const routePaths = route.split('/')

  if (pathParts.length !== routePaths.length) {
    return null
  }

  const params = {}

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(':')) {
      const paramName = routePaths[i].slice(1)

      params[paramName] = pathParts[i]
    } else if (routePaths[i] !== pathParts[i]) {
      return null
    }
  }

  return params
}

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

  for (const route in routes) {
    const params = matchPath(path, route)

    if (params) {
      const Page = routes[route]

      return <Page params={params} />
    }
  }

  const NotFound = routes['*']

  return <NotFound />
}

export default Router