type NotePriority = 'low' | 'normal' | 'high'

interface Note {
  id: string;
  title: string;
  content: string;
  priority: NotePriority;
  isDone: boolean;
}

type NewNote = Omit<Note, 'id'>