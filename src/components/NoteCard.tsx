export default function Notecard() {
  return (
    <button className='text-left duration-300 rounded-md bg-slate-800 outline-none p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
      <span className='text-sm font-medium text-slate-300'>Há 2 dias</span>
      <p className='text-sm leading-6 text-slate-400'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident at
        dicta commodi sint in? Voluptas hic tempora at neque fugit est illum
        fugiat nihil. Quam maxime pariatur assumenda illo iusto? Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Provident at dicta commodi
        sint in? Voluptas hic tempora at neque fugit est illum fugiat nihil.
        Quam maxime pariatur assumenda illo iusto? Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Provident at dicta commodi sint in?
        Voluptas hic tempora at neque fugit est illum fugiat nihil. Quam maxime
        pariatur assumenda illo iusto?
      </p>

      <div className='absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none' />
    </button>
  );
}
