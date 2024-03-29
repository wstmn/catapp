import { FC, useContext, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import toggleFavourite from '../toggles/toggleFavourite';
import { CatsContext, State } from '../components/Home';
import { cat } from '../hooks/useFetch';

export interface Navbarprops {
        favState: State;
        setFavState: Function;
        onSearch: (cat: cat[]) => void;
}




export const Navbar: FC<Navbarprops> = ({ favState, setFavState, onSearch }) => {

        const { originalCats} = useContext(CatsContext);

        const [search, setSearch] = useState<string>("");


        function searchCats(onSearch: Function) {
                var searchedCats: cat[] | undefined = originalCats;
                if (!search) {
                        console.log("search 0")
                } else if(searchedCats != undefined) {
                        const filteredCats = searchedCats.filter((cat) =>
                                cat.breed.toLowerCase().includes(search.toLowerCase())
                        );
                        searchedCats = filteredCats;
                }

                onSearch(searchedCats)
        }

        return <div className='bg-gray-900 border-b border-gray-300  sticky top-0 z-10'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>

                        <p className='ml-auto mr-auto'>
                                <input className='rounded-lg border-white border-4' onChange={(e) => setSearch(e.target.value)}></input>
                                <button className='bg-gray-500 hover:bg-gray-700 m-2 rounded-lg w-10 text-center text-white duration-150' onClick={() => searchCats(onSearch)}>GO</button>
                        </p>

                        <StarIcon onClick={() => { toggleFavourite(favState, setFavState) }} className='w-10 h-10 text-white hover:text-yellow-300 duration-200'></StarIcon>
                </div>
        </div>
}

export default Navbar