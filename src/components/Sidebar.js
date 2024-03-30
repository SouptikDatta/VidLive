import React from 'react';
import { useSelector } from 'react-redux';
import { FaHome, FaMusic, FaPlay, FaVideo, FaFootballBall, FaGamepad, FaFilm } from 'react-icons/fa';

export default function Sidebar() {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen);

  // Early return if the menu is not open
  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className='w-48 shadow-lg p-10 bg-blue-900 text-white gap-3'>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center"><FaHome /><span className="ml-2">Home</span></li>
        <li className="flex items-center"><FaMusic /><span className="ml-2">Music</span></li>
        <li className="flex items-center"><FaVideo /><span className="ml-2">Videos</span></li>
        <li className="flex items-center"><FaPlay /><span className="ml-2">Live</span></li>
      </ul>
      <h1 className='font-bold pt-6 pb-3 text-blue-500'>Subscriptions</h1>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center"><FaMusic /><span className="ml-2">Music</span></li>
        <li className="flex items-center"><FaFootballBall /><span className="ml-2">Sports</span></li>
        <li className="flex items-center"><FaGamepad /><span className="ml-2">Gaming</span></li>
        <li className="flex items-center"><FaFilm /><span className="ml-2">Movies</span></li>
      </ul>
      <h1 className='font-bold pt-6 pb-3 text-blue-500'>Watch Later</h1>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center"><FaMusic /><span className="ml-2">Music</span></li>
        <li className="flex items-center"><FaFootballBall /><span className="ml-2">Sports</span></li>
      </ul>
    </div>
  );
}
