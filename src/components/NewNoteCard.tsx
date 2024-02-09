import { ChangeEvent, FormEvent, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { NewNoteCardProps } from '../models';

let speechRecognition: SpeechRecognition | null = null;

export default function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  function handleStartEditor() {
    setShowOnboarding(true);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setNoteContent(value);
    if (value === '') {
      setShowOnboarding(false);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    if (noteContent === '') {
      toast.error('A nota está vazia!');
      return;
    }
    onNoteCreated(noteContent);
    setNoteContent('');
    setShowOnboarding(false);
    toast.success('Nota criada com sucesso!');
  }

  function handleStartRecording() {
    const isSpeechRecognitionAvaliable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAvaliable) {
      toast.error(
        'Infelizmente, o seu navegador não oferece suporte à gravação de áudio. Só é possível criar as notas utilizando texto.',
      );
      return;
    }

    setIsRecording(true);
    setShowOnboarding(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognition();
    speechRecognition.lang = 'pt-BR';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      setNoteContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);
    speechRecognition?.stop();
  }

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
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute top-0 right-0 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 duration-200'>
            <X className='size-5' />
          </Dialog.Close>

          <form className='flex flex-1 flex-col'>
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-md md:text-sm font-medium text-slate-300'>
                Adicionar nota
              </span>
              {showOnboarding ? (
                <textarea
                  value={noteContent}
                  autoFocus
                  placeholder='Escreva sua nota...'
                  onChange={handleContentChange}
                  className='text-sm leading-6 text-slate-400 outline-none bg-transparent resize-none flex-1 placeholder:text-slate-600'
                  name='noteContent'
                  id='noteContent'
                />
              ) : (
                <p className='text-sm leading-6 text-slate-400 pt-3 md:pt-0'>
                  Comece{' '}
                  <button
                    type='button'
                    onClick={handleStartRecording}
                    className='text-lime-400 font-medium hover:underline'
                  >
                    gravando uma nota em áudio
                  </button>{' '}
                  ou, se preferir,{' '}
                  <button
                    type='button'
                    onClick={handleStartEditor}
                    className='text-lime-400 font-medium hover:underline'
                  >
                    utilize apenas texto.
                  </button>
                </p>
              )}
            </div>

            {isRecording ? (
              <button
                type='button'
                onClick={handleStopRecording}
                className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 font-bold outline-none hover:text-slate-100 duration-200'
              >
                <div className='size-3 rounded-full bg-red-400 animate-pulse' />
                Gravando... (Clique para interromper)
              </button>
            ) : (
              showOnboarding && (
                <button
                  type='button'
                  onClick={handleSaveNote}
                  className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-bold outline-none hover:bg-lime-500 duration-200'
                >
                  Salvar nota
                </button>
              )
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
