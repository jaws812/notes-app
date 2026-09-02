import {useContext} from "react";
import AddNoteForm from "@/features/add-note";
import SearchNoteFrom from "@/features/search-notes";
import FilterNotes from "@/features/filter-notes";
import ShowNotification from "@/features/show-notification";
import NoteInfo from "@/features/stats";
import {NoteList, NotesActionsContext, NotesDataContext} from "@/entities/note";
import Button from "@/shared/ui/Button";
import css from './Note.module.scss'

const Note = () => {

  const {
    setSortOnPriority,
    firstIncompleteNoteRef,
    loadNotes,
    setLoadError,
    setIsLoading,
  } = useContext(NotesActionsContext)

  const {
    sortOnPriority,
    firstIncompleteNoteId,
    loadError,
    isLoading,
  } = useContext(NotesDataContext)

  if (isLoading) {
    return (<div>Идет загрузка страницы...</div>)
  }

  if (loadError) {
    return (
      <>
        <div>Данных о заметках нет, проблемы с сервером</div>
        <Button
          className={css.retryButton}
          fullWidth
          onClick={() => {
            setLoadError(false)
            setIsLoading(true)
            loadNotes()
          }}
        >Повторить снова</Button>
      </>
    )
  }

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
        <Button onClick={() => setSortOnPriority(!sortOnPriority)}>
          Сортировка по приоритету: {sortOnPriority ? 'включено' : 'выключено'}
        </Button>
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