import {useRef} from "react";
import type {Note} from './types'

const useIncompleteNoteScroll = (notes: Note[]) => {
  const firstIncompleteNoteRef = useRef<HTMLLIElement | null>(null)
  const firstIncompleteNoteId = notes.find(({isDone}) => !isDone)?.id

  return {
    firstIncompleteNoteRef,
    firstIncompleteNoteId
  }
}

export default useIncompleteNoteScroll