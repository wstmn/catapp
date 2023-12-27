
import { FC } from 'react';
import '../css/index.css'

import { cat } from '../hooks/useFetch';



export interface catsProps {
  catObj: cat
  onOpen: (catInfo: cat) => void
}

export const Cats: FC<catsProps> = ({ catObj, onOpen }) => {

  return (
    <div onClick={() => { onOpen(catObj) }} id={catObj.id}
      className='p-4 max-w-6xl w-200 bg-gray-700 hover:bg-slate-200 brightness-100 shadow-md inline-block items-center justify-between m-4 font-roboto rounded ml-4 mr-4 duration-300 text-white hover:text-black'>
      <p className=''>{[catObj.breed]} <button className='mx-auto' >{catObj.favourite ? "⭐" : ""}</button></p>

    </div>
  );
}
