import NoteItem from "../NoteItem/NoteItem";

const NoteList = () => {
  return(
    <ul className="note__list">
      <NoteItem />
      <NoteItem />
      <NoteItem />
    </ul>
  )
}

export default NoteList