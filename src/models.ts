export interface Note {
  date: Date;
  content: string;
}

export interface NoteCardProps {
  note: Note;
}

export interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}
