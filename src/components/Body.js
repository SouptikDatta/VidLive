import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function Body() {
  return (
    <div className='flex'>
        <Sidebar />
        <Outlet />
    </div>
  )
}
