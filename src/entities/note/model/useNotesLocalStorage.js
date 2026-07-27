const useNotesLocalStorage = () => {
  const savedNotes = localStorage.getItem('notes')

  const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }

  return {
    savedNotes: savedNotes ? JSON.parse(savedNotes) : null,
    saveNotes
  }
}

export default useNotesLocalStorage