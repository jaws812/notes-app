// import s from './Note.scss'
import AddNoteForm from "../../features/add-note/AddNoteForm";
import SearchNoteFrom from "../../features/search-notes/SearchNoteFrom";
import NoteInfo from "../../features/stats/NoteInfo";
import NoteList from "../../entities/note/ui/NoteList/NoteList";
import './Note.scss'

const Note = () => {
  const notes = [
    {
      id: 1,
      title: "Купить машины",
      content: "Dodge, Toyota, Honda, Supra",
      isDone: true,
    },
    {
      id: 2,
      title: "Погладить котов",
      content: "Кнопа, Буся, Пуся",
      isDone: false,
    },
    {
      id: 3,
      title: "Построить дом",
      content: "Лес, озеро с лебедями, тишина",
      isDone: true,
    },    {
      id: 4,
      title: "Путешествие в Японию",
      content: "Посетить Фудзияму",
      isDone: false,
    },
  ]

  return (
    <div className="note">
      <h1 className="note__title">Мои заметки</h1>
      <AddNoteForm />
      <SearchNoteFrom />
      <NoteInfo notes={notes}/>
      <NoteList />
    </div>
  )
}

export default Note