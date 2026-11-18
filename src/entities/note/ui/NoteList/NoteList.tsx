import {memo} from 'react'
import {NoteItem, useNotesData} from "@/entities/note"
import type {NotesFilter} from "@/entities/note"

interface NoteListProps {
  css: Record<string, string>
}

const filterLabels: Record<NotesFilter, string> = {
  all: 'Заметок',
  active: 'Активных заметок',
  completed: 'Выполненных заметок',
}

const NoteList = (props: NoteListProps) => {
  const {
    css,
  } = props

  const {
    notes,
    visibleNotes,
    notesToRender,
    filter,
  } = useNotesData()

  const hasNotes = notes.length > 0

  if (!hasNotes) {
    return (<div className={css.emptyMessage}>Заметок нет</div>)
  }

  if (notesToRender.length === 0) {
    if (visibleNotes.length === 0) {
      return (
        <div className={css.emptyMessage}>{filterLabels[filter]} нет</div>)
    } else {
      return (
        <div className={css.emptyMessage}>{filterLabels[filter]} не найдено</div>)
    }
  }

  return (
    <ul className={css.list}>
      {notesToRender.map((note) => (
        <NoteItem
          key={note.id}
          {...note}
        />
      ))}
    </ul>
  )
}

export default memo(NoteList)