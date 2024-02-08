import Logo from './assets/Logo.svg';
import NewNoteCard from './components/NewNoteCard';
import Notecard from './components/NoteCard';

function App() {
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={Logo} alt='Logo' />
      <form className='w-full '>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder:text-slate-500'
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard />

        <Notecard />
        <Notecard />
        <Notecard />
      </div>
    </div>
  );
}

export default App;
