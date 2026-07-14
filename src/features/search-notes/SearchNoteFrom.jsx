import Field from "../../shared/ui/Field/Field";

const SearchNoteFrom = () => {
  return (
    <form className="note__form">
      <Field
        className="note__field"
        id="search-note"
        type="text"
        label="Поиск по заметкам"
      />
    </form>
  )
}

export default SearchNoteFrom