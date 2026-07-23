import Note from "../widgets/Note/Note";
import './styles'
import {NotesProvider} from "../entities/note/model/NotesContext";

const App = () => {
  return (
    <NotesProvider>
      <Note />
    </NotesProvider>
  )
}

export default App