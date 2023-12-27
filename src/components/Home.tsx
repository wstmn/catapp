
import { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import CatModal from "./CatModal";
import Sidebar from "./sidebar/Sidebar";
import CatsList from "./CatsList";
import Footer from "./Footer";
import { cat, useCatApi } from "../hooks/useFetch";


export interface catBreeds {

}

export type State = "star" | "non-star";



const Home = () => {
  const isLoading: boolean = false
  const [cats, setCats] = useState<cat[]>();
  const [originalCats, setOriginalCats] = useState<cat[]>();
  
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
  
  const { getCats } = useCatApi();

  useMemo(() => {
    const fetchData = async () => {
        try {
            const data: cat[] = await getCats();
            setCats(data);
            setOriginalCats(data);
        } catch (error) {
            // Handle errors if needed
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
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
        <div className='bg-gray-900 max-h-max h-max'>
          <div  className='bg-gray-900 max-h-max h-max ml-24'>
          {isLoading ? "grabbing cats" : ""}
    
        {originalCats && (
          <Navbar favState={favouriteState} setFavState={setFavouriteState} cat={originalCats} onSearch={handleSearch}></Navbar>
        )}
    
    
          {selectedCat && (
            <CatModal cat={selectedCat} onClose={handleClose} onFavourite={handleFavourite}/>
          )}

          
          {cats && <CatsList cats={cats} handleOpen={handleOpen}/>}  {/* lista kotów */} 
          


         </div>
          <Sidebar />
    
          <Footer></Footer>
          
    
        </div>
        
      );
    };

export default Home