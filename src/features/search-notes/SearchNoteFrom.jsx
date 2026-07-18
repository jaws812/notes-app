import Field from "../../shared/ui/Field/Field";

const SearchNoteFrom = (props) => {
  const {
    onSearchInput,
  } = props
  return (
    <form
      className="note__form"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field
        className="note__field"
        id="search-note"
        type="text"
        label="Поиск по заметкам"
        onInput={(event) => onSearchInput(event.target.value)}
      />
    </form>
  )
}

export default SearchNoteFrom