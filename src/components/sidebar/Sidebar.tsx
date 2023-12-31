import { FC, useState } from 'react';
import { HomeIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Login } from './Login';
import { Link } from 'react-router-dom';


export interface Sidebarprops {
}

export const Sidebar: FC<Sidebarprops> = ({ }) => {


    const [open, setOpen] = useState<boolean>(false);


    return <div className='fixed flex top-0 z-20 h-max min-h-max'>

        <div className={`flex flex-col ${open ? 'w-72' : 'w-24'} duration-300 h-screen border-r-2 border-slate-600 bg-slate-800 float-left z-10`}>

            <img
                src='./src/assets/cat.png'
                className={`text-white ${open ? 'w-24 h-24' : 'w-16 h-16'} ${open ? 'ml-20' : 'ml-3'} mt-1 duration-300 invert`}
             />

            <img 
                src='./src/assets/control.png'
                className='absolute cursor-pointer rounded-full -right-3 top-9 border-2 border-gray-700 w-8 h-8'
                onClick={() => setOpen(!open)}
            />

            <Link to={'http://localhost:5173/'} className='bg-slate-800 hover:bg-slate-700 border-l-0 hover:border-l-4 border-white duration-150 p-3 text-center flex items-center ml-4 mt-10'>
                <HomeIcon className='w-10 h-10 text-white mr-6' />
                <p className='text-white font-roboto font-thin'>{open ? 'cats' : ''}</p>
            </Link>

            <Login open={open} />

            {/* Add more elements with reduced vertical spacing */}
            <Link to={'http://localhost:5173/cat'} className='bg-slate-800 hover:bg-slate-700 border-l-0 hover:border-l-4 border-white duration-150 p-3 text-center flex items-center mb-2 mt-2 ml-4 '>
                <PlusIcon className='w-10 h-10 text-white mr-6' />
                <p className='text-white font-roboto font-thin'>{open ? 'Add custom cats' : ''}</p>
            </Link>

            {/* Add more elements here */}
        </div>
        {open && <div className='fixed z-0 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center duration-300'> </div>}
    </div>


}

export default Sidebar