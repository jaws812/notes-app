import NoteItem from "../NoteItem/NoteItem";

const NoteList = (props) => {
  const {
    notes,
    onDeleteNoteButtonClick,
    onNoteCompleteChange,
    filteredNotes,
    css,
  } = props

  const hasNotes = notes.length > 0
  const isEmptyFilteredNotes = filteredNotes?.length === 0

  if(!hasNotes){
    return (<div className={css.emptyMessage}>Задач нет</div>)
  }

  if(hasNotes && isEmptyFilteredNotes){
    return (<div className={css.emptyMessage}>Задачи не найдены</div>)
  }


  return (
    <ul className={css.list}>
      {(filteredNotes ?? notes).map((note) => (
        <NoteItem
          key={note.id}
          onDeleteNoteButtonClick={onDeleteNoteButtonClick}
          onNoteCompleteChange={onNoteCompleteChange}
          {...note}
        />
      ))}
    </ul>
  )
}

export default NoteList