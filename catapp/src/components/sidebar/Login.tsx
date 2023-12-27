import { FC } from 'react'
import { UserIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export interface IAppProps {
  open: boolean
}

export const Login: FC<IAppProps> = ({ open }) => {
  return (
    <Link to={'http://localhost:5173/profile'} id='google-login-btn' className='bg-slate-800 border-l-0 hover:border-l-4 border-white duration-150 mt-4 hover:bg-slate-700 p-3 text-center flex items-center mb-2  ml-4'>
      <UserIcon className='w-10 h-10 text-white mr-6' />
      <p className='text-white font-roboto font-thin'>{open ? 'Login' : ''}</p>
    </Link>

  );
}
