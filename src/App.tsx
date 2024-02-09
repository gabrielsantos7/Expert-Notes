import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Note } from './models';
import NewNoteCard from './components/NewNoteCard';
import Notecard from './components/NoteCard';

import Logo from './assets/Logo.svg';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storagedNotes = localStorage.getItem('notes');
    setNotes(storagedNotes ? JSON.parse(storagedNotes) : []);
  }, []);

  function onNoteCreated(content: string) {
    const newNotes = [
      { id: crypto.randomUUID(), date: new Date(), content },
      ...notes,
    ];
    setNotes(newNotes);

    localStorage.setItem('notes', JSON.stringify(newNotes));
  }

  function handleDeleteNote(id: string) {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    toast.success('Nota apagada com sucesso!');
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(search.toLowerCase()),
        )
      : notes;

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 lg:px-0'>
      <img src={Logo} alt='Logo' />
      <form className='w-full '>
        <input
          type='search'
          onChange={handleSearch}
          value={search}
          name='search'
          id='search'
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-xl lg:text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500 pb-2 border-b border-slate-700'
        />
      </form>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note, index) => (
          <Notecard key={index} onDelete={handleDeleteNote} note={note} />
        ))}
      </div>
    </div>
  );
}

export default App;
