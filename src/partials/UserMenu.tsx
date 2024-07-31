import React from 'react';
import Image from 'next/image';

function UserMenu() {
  return (
    <div className='dropdown dropdown-end bigp:hidden'>
      <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
        <div className='w-10 rounded-full'>
          <Image src='/logo/image.png' alt='logo' width='52' height='52' />
        </div>
      </label>
      <ul tabIndex={0} className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'>
        <li>
          <p className='justify-between'>
            Profile
            <span className='badge'>New</span>
          </p>
        </li>
        <li>
          <p>Settings</p>
        </li>
        <li>
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
