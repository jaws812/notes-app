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
        // addNote={addNote}
        // newNoteTitle={newNoteTitle}
        // setNewNoteTitle={setNewNoteTitle}
        // newNoteContent={newNoteContent}
        // setNewNoteContent={setNewNoteContent}
        // newNoteInputRef={newNoteInputRef}
        css={css}
      />
      <SearchNoteFrom
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
        css={css}
      />
      <NoteInfo
        css={css}
      />
      <Button
        onClick={
          () => firstIncompleteNoteRef.current?.scrollIntoView({behavior: 'smooth'})
        }
        allWidth
      >Перейти к первой невыполненной задаче</Button>
      <NoteList
        css={css}
      />
    </div>
  )
}

export default Note