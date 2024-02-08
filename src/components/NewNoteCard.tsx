import * as Dialog from '@radix-ui/react-dialog';
// import { formatDistanceToNow } from 'date-fns';
// import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

export default function NewNoteCard() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md flex flex-col text-left bg-slate-700 p-5 gap-3 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 duration-200'>
        <span className='text-sm font-medium text-slate-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content className='fixed overflow-hidden left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute top-0 right-0 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 duration-200'>
            <X className='size-5' />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              Adicionar nota
            </span>
            <p className='text-sm leading-6 text-slate-400'>
              Comece{' '}
              <button className='text-lime-400 font-medium hover:underline'>gravando uma nota em áudio</button>{' '}
              ou, se preferir,{' '}
              <button className='text-lime-400 font-medium hover:underline'>utilize apenas texto.</button>
            </p>
          </div>

          <button
            type='button'
            className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-bold outline-none hover:bg-lime-500 duration-200'
          >
            Salvar nota
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
