import {useRef} from "react";

const useIncompleteNoteScroll = (notes) => {
  const firstIncompleteNoteRef = useRef(null)
  const firstIncompleteNoteId = notes.find(({isDone}) => !isDone)?.id

  return {
    firstIncompleteNoteRef,
    firstIncompleteNoteId
  }
}

export default useIncompleteNoteScroll