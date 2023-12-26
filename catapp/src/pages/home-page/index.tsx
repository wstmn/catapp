import axios from 'axios';
import { FC,  useEffect,  useMemo, useState } from 'react';
import Footer from '../../components/Footer';
import Sidebar from '../../components/sidebar/Sidebar';
import { Cats } from '../../components/Cats';
import CatModal from '../../components/CatModal';
import Navbar from '../../components/Navbar';


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
  
  useEffect(() => {
    console.log("TRrigger useEffect")
    if(!originalCats){
      return;
    }
    const catlist = originalCats.filter(obj => obj.favourite === true || favouriteState === 'non-star' );
    console.log("Set cat list", catlist);
    setCats(catlist);
  },[favouriteState, originalCats, searchedCats])
  
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
        <div className='bg-red-100 max-h-max h-max'>
          <div  className='bg-red-100 max-h-max h-max ml-24'>
          {isLoading ? "Loading..." : ""}
    
        {originalCats && (
          <Navbar favState={favouriteState} setFavState={setFavouriteState} cat={originalCats} onSearch={handleSearch}></Navbar>
        )}
    
    
          {selectedCat && (
            <CatModal cat={selectedCat} onClose={handleClose} onFavourite={handleFavourite}/>
          )}
    
            {cats && cats?.map((cat) => {
                return <Cats key={cat.id} catObj={cat} onOpen={handleOpen}/>
            })}
         </div>
          <Sidebar/>
    
          <Footer></Footer>
          
    
        </div>
        
      );
    };

export default index 