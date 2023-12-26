import {FC} from 'react'
import { UserIcon } from '@heroicons/react/24/solid';

export interface IAppProps {
    open: boolean
}

export const Login: FC<IAppProps> = ({ open }) => {
  return (
    <button id='google-login-btn' className='bg-gray-600 border-l-0 hover:border-l-4 border-white duration-150 mt-12 hover:bg-gray-700 p-3 text-center flex items-center mb-2  ml-4'>
        <UserIcon className='w-10 h-10 text-white mr-6' />
        <p className='text-white font-roboto font-thin'>{open ? 'Login' : ''}</p>
    </button>

  );
}
