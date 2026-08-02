import {NotesProvider} from "@/entities/note";
import Note from "@/widgets/Note";

const NotesPage = () => {
  return (
    <NotesProvider>
      <Note />
    </NotesProvider>
  )
}

export default NotesPage