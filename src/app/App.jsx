import NotesPage from "../pages/NotesPage/NotesPage";
import NotePage from "../pages/NotePage/NotePage";
import './styles'
import Router from "./routing/Router";

const App = () => {
  const routes = {
    '/': NotesPage,
    '/notes/123': NotePage,
    '*': ()=><div>Страница не найдена</div>,
  }
  return (
  <Router routes={routes} />
  )
}

export default App