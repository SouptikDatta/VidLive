import React from 'react';

export default function ButtonList() {
  const list = ['All', 'New for you', 'Songs', 'Live', 'News', 'Cooking'];

  const Button = ({ name }) => (
    <div className='p-4'>
      <button className='px-5 py-1 bg-gray-700 text-white rounded-md'>{name}</button>
    </div>
  );

  return (
    <div className='flex bg-gray-900'>
      {list.map(d => (
        <Button name={d} key={d} />
      ))}
    </div>
  );
}
