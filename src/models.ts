export interface Note {
  id: string
  date: Date;
  content: string;
}

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}
