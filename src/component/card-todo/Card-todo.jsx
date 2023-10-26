import React from 'react';

function TodoCard({ title, description, onDelete }) {
  return (
    <div className=' bg-slate-200 w-full sm:w-[48%] m-auto rounded-xl text-left px-3 py-1'>
        <h3 className='text-2xl text-blue-900'>{title}</h3>
        <p className='text-l text-slate-600'>{description}</p>
        <button className='float-right text-slate-200 hover:text-red-900 p-1 text-xl bg-red-600 hover:bg-transparent border-4 border-transparent hover:border-3 hover:border-solid hover:border-red-500 rounded-lg'
        onClick={onDelete}>🪨</button>
    </div>
  );
}


export default TodoCard;
