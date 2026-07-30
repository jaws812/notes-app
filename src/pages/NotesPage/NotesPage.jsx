import {NotesProvider} from "../../entities/note/model/NotesContext";
import Note from "../../widgets/Note/Note";

const NotesPage = () => {
  return (
    <NotesProvider>
      <Note />
    </NotesProvider>
  )
}

export default NotesPage