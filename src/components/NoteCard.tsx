import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

import { NoteCardProps } from '../models';

export default function Notecard({ note, onDelete }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col text-left duration-300 rounded-md bg-slate-800 outline-none p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className='text-sm leading-6 text-slate-400'>{note.content}</p>

        <div className='absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none' />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/50' />
        <Dialog.Content className='fixed inset-0 md:inset-auto overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute top-0 right-0 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 duration-200'>
            <X className='size-5' />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-md md:text-sm font-medium text-slate-300'>
              {format(note.date, "dd/MM/yyyy' às ' HH:mm")}
            </span>
            <p className='text-sm leading-6 text-slate-400'>{note.content}</p>
          </div>

          <Dialog.Close
            type='button'
            onClick={() => onDelete(note.id)}
            className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
          >
            Deseja{' '}
            <span className='text-red-400 group-hover:underline'>
              apagar essa nota
            </span>
            ?
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
