import NoteItem from "../NoteItem/NoteItem";

const NoteList = (props) => {
  const {
    notes,
    onDeleteNoteButtonClick,
    onNoteCompleteChange,
  } = props


  return (
    <ul className="note__list">
      {notes.map((note) => (
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