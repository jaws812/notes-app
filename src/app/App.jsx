import Router from "./routing/Router";
import NotesPage from "@/pages/NotesPage";
import NotePage from "@/pages/NotePage";
import './styles'

const App = () => {
  const routes = {
    '/': NotesPage,
    '/notes/:id': NotePage,
    '*': () => <div>Страница не найдена</div>,
  }
  return (
    <Router routes={routes} />
  )
}

export default App