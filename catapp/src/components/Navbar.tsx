import {FC, useState} from 'react';
import { UserIcon, StarIcon } from '@heroicons/react/24/solid';
import toggleFavourite from '../toggles/toggleFavourite';
import { State, cat } from '../App';

export interface Navbarprops  {
        favState: State;
        setFavState: Function;
        cat: cat[];
        onSearch: (cat:cat[]) => void;
}




export const Navbar: FC<Navbarprops> = ({favState, setFavState, cat, onSearch}) => {

const [search, setSearch] = useState<string>("");


function searchCats(onSearch:Function) {
        var searchedCats:cat[] = cat;
        if(!search){
                console.log("search 0")
        }else{
        const filteredCats = searchedCats.filter((cat) =>
          cat.breed.toLowerCase().includes(search.toLowerCase())
        );
                 searchedCats = filteredCats;
        }

        onSearch(searchedCats)
      }

return <div className='bg-gray-500 dark:bg-gray-700 border-gray-200  sticky top-0 z-10'>
    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>

    <p className='ml-auto mr-auto'>  
          <input className='rounded-lg border-white border-4' onChange={(e) => setSearch(e.target.value)}></input>
          <button className='bg-rose-200 m-2 rounded-lg w-10 text-center text-black' onClick={() => searchCats(onSearch)}>GO</button> 
    </p>

    <StarIcon onClick={() => {toggleFavourite(favState, setFavState)}} className='w-10 h-10 text-white hover:text-yellow-300 duration-200'></StarIcon>
    </div>
 </div>
}

export default Navbar