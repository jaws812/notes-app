import {useContext} from "react";
import AddNoteForm from "@/features/add-note";
import SearchNoteFrom from "@/features/search-notes";
import FilterNotes from "@/features/filter-notes";
import ShowNotification from "@/features/show-notification";
import NoteInfo from "@/features/stats";
import {NoteList} from "@/entities/note";
import {NotesContext} from "@/entities/note";
import Button from "@/shared/ui/Button";
import css from './Note.module.scss'

const Note = () => {

  const {
    firstIncompleteNoteId,
    firstIncompleteNoteRef,
  } = useContext(NotesContext)

  return (
    <>
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
        {firstIncompleteNoteId && (
          <Button
            onClick={
              () => firstIncompleteNoteRef.current?.scrollIntoView({behavior: 'smooth'})
            }
            fullWidth
          >Перейти к первой невыполненной заметке</Button>
        )}
        <FilterNotes css={css} />
        <NoteList
          css={css}
        />
      </div>
      <ShowNotification />
    </>
  )
}

export default Note