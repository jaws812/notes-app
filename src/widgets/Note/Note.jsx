import {
  useContext,
} from "react";
import AddNoteForm from "../../features/add-note/AddNoteForm";
import SearchNoteFrom from "../../features/search-notes/SearchNoteFrom";
import NoteInfo from "../../features/stats/NoteInfo";
import NoteList from "../../entities/note/ui/NoteList/NoteList";
import Button from "../../shared/ui/Button/Button";
import {NotesContext} from "../../entities/note/model/NotesContext";
import css from './Note.module.scss'

const Note = () => {

  const {firstIncompleteNoteRef} = useContext(NotesContext)
  return (
    <div className={css.note}>
      <h1 className={css.title}>Мои заметки</h1>
      <AddNoteForm
        css={css}
      />
      <SearchNoteFrom
        css={css}
      />
      <NoteInfo
        css={css}
      />
      <Button
        onClick={
          () => firstIncompleteNoteRef.current?.scrollIntoView({behavior: 'smooth'})
        }
        fullWidth
      >Перейти к первой невыполненной задаче</Button>
      <NoteList
        css={css}
      />
    </div>
  )
}

export default Note