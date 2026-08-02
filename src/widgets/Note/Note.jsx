import {useContext} from "react";
import AddNoteForm from "@/features/add-note";
import SearchNoteFrom from "@/features/search-notes";
import NoteInfo from "@/features/stats";
import {NoteList} from "@/entities/note";
import Button from "@/shared/ui/Button";
import {NotesContext} from "@/entities/note";
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