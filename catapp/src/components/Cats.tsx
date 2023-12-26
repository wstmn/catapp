
import { FC } from 'react';
import '../css/index.css'
import {cat }from '../App'
import { useCopyToClipboard } from '@uidotdev/usehooks';


export interface catsProps  {
    catObj: cat
    onOpen: (catInfo: cat) => void
}

export const Cats: FC<catsProps> = ({ catObj, onOpen}) => {

const [value, copy] = useCopyToClipboard()
  return (
    <div onClick={() => {onOpen(catObj); copy(catObj.breed + " cat")}} id={catObj.id} 
      className='p-4 max-w-6xl w-200 bg-red-200 brightness-100 hover:brightness-95 shadow-md inline-block items-center justify-between m-4 font-roboto rounded ml-4 mr-4 duration-300'>
       <p className=''>{[catObj.breed]} <button className='mx-auto' >{catObj.favourite ? "⭐" : ""  }</button></p>
       
    </div>
  );
}
