import Button from "../../shared/ui/Button/Button";

const NoteInfo = (props) => {
  const {
    notes,
  } = props

  const total = notes.length
  const done = notes.filter(note => note.isDone === true).length

  return (
    <div className="note__info">
      <div>Завершено {done} из {total}</div>
      <Button
        className="note__delete-all-button"
        title="Удалить все"
      />
    </div>
  )
}

export default NoteInfo