import {FC} from 'react'
import { cat } from '../pages/home-page';


export interface CatModalprops  {
    cat: cat;
    onClose: () => void;
    onFavourite: (catId: string) => void;
}


export const CatModal: FC<CatModalprops> = ({cat, onClose, onFavourite}) => {

return  <div onClick={onClose} className='fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='bg-rose-100 text-center p-10 font-roboto border-2 border-rose-300 rounded'> 
            <p className='p-1 bg-rose-100 hover:bg-rose-200 rounded-2xl'>Breed: {cat.breed ? cat.breed: "No Data"}</p>
            <p className='p-1 bg-rose-100 hover:bg-rose-200 rounded-2xl'>Country: {cat.country ? cat.country: "No Data"}</p>
            <p className='p-1 bg-rose-100 hover:bg-rose-200 rounded-2xl'>Coat: {cat.coat ? cat.coat: "No Data"}</p>
            <p className='p-1 bg-rose-100 hover:bg-rose-200 rounded-2xl'>Pattern: {cat.pattern ? cat.pattern: "No Data"}</p>
        <button onClick={() => onFavourite && onFavourite(cat.id)} className='mx-auto bg-rose-100 hover:bg-rose-200 rounded-2xl' > {cat.favourite ? "⭐" : "✰"  }</button>
         </div>
    </div>

}

export default CatModal