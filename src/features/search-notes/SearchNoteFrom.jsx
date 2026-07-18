import Field from "../../shared/ui/Field/Field";

const SearchNoteFrom = (props) => {
  const {
    searchQuery,
    setSearchQuery,
    css,
  } = props
  return (
    <form
      className={css.form}
      onSubmit={(event) => event.preventDefault()}
    >
      <Field
        className={css.field}
        id="search-note"
        type="text"
        label="Поиск по заметкам"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  )
}

export default SearchNoteFrom