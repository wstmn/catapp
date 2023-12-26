import axios from 'axios';
import { FC,  useEffect,  useMemo, useState } from 'react';
import Footer from '../../components/Footer';
import Sidebar from '../../components/sidebar/Sidebar';
import { Cats } from '../../components/Cats';
import CatModal from '../../components/CatModal';
import Navbar from '../../components/Navbar';
import CatsList from '../../components/CatsList';
import { CakeIcon } from '@heroicons/react/24/solid';


interface AppProps {
  title: string
}

export interface cat {
  breed: string,
  country: string,
  origin: string,
  coat: string,
  pattern: string,
  favourite: boolean,
  id: string
}

export type State = "star" | "non-star";



const index = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cats, setCats] = useState<cat[]>();
  const [originalCats, setOriginalCats] = useState<cat[]>();
  
  const [catModalOpen, setcatModalOpen] = useState<boolean>(false);
  
  const [favouriteState, setFavouriteState] = useState<State>("non-star")
  
  const [selectedCat, setSelectedCat] = useState<cat>();
  
  const [searchedCats, setSearchedCats] = useState<cat[]>(  );
  
  
  function handleFavourite(id:string):void{
    console.log('handleFavourite for catId =' + id);
    originalCats?.map((cat) => {
        if(cat.id === id){
          console.log(cat.favourite ? cat.breed +  ' has been removed from favourites!' : cat.breed + ' has been added to favourites!');
          cat.favourite = !cat.favourite;
        }        
    });
  
    setOriginalCats(originalCats); 
    console.log("setOriginalCat")   
  }
  
  function handleClose():void{
    setSelectedCat(undefined) 
    console.log("closed")
  }
  
  function handleOpen(catObj:cat):void{
    setSelectedCat(catObj)
    console.log("open" , catObj)
  };
  
  function handleSearch(catSearched:cat[]):void{
    if(!catSearched){setSearchedCats(cats)}
    setSearchedCats(catSearched)
    console.log("original cats set: " + catSearched)
  }
  
   {/* api call */} 
  useMemo(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          'https://catfact.ninja/breeds?limit=100'
        );
        const catsList = data.data
  
        catsList.map((cat:cat) => {
          cat.id = cat.breed + cat.origin + cat.country
        })
        
        console.log(catsList);
        setOriginalCats(catsList)
      } catch (error) {
        console.log(error);
      }finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);
  
   {/* synchronizować koty */} 
  useEffect(() => {
    console.log("TRrigger useEffect")
    if(!originalCats){
      return;
    }
    const catlist = originalCats.filter(obj => obj.favourite === true || favouriteState === 'non-star' );
    console.log("Set cat list", catlist);
    setCats(catlist);
  },[favouriteState, originalCats, searchedCats])
  
  {/* obejrzyj (oglądać) poszukiwanego kota */} 
  useEffect(() => {
    if(!searchedCats){
      setOriginalCats(originalCats)
      console.log("no search cats")
      return
    }
    const catlist = searchedCats.filter(obj => obj.favourite === true || favouriteState === 'non-star' );
    setCats(catlist);
  },[searchedCats])


    return(
        <div className='bg-rose-50 max-h-max h-max'>
          <div  className='bg-rose-50 max-h-max h-max ml-24'>
          {isLoading ? "grabbing cats" : ""}
    
        {originalCats && (
          <Navbar favState={favouriteState} setFavState={setFavouriteState} cat={originalCats} onSearch={handleSearch}></Navbar>
        )}
    
    
          {selectedCat && (
            <CatModal cat={selectedCat} onClose={handleClose} onFavourite={handleFavourite}/>
          )}

          
          {cats && <CatsList cats={cats} handleOpen={handleOpen}/>}  {/* lista kotów */} 
          


         </div>
          <Sidebar/>
    
          <Footer></Footer>
          
    
        </div>
        
      );
    };

export default index 