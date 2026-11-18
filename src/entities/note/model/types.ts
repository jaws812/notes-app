export interface Note {
  id: string;
  title: string;
  content: string;
  priority: NotePriority;
  isDone: boolean;
}

export type NotePriority = 'low' | 'normal' | 'high'
export type NotesFilter = 'all' | 'active' | 'completed'
export type NewNote = Omit<Note, 'id'>
