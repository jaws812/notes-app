export type NotePriority = 'low' | 'normal' | 'high'

export interface Note {
  id: string;
  title: string;
  content: string;
  priority: NotePriority;
  isDone: boolean;
}

export type NewNote = Omit<Note, 'id'>

export type NotesFilter = 'all' | 'completed' | 'active'