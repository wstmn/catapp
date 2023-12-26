import { State } from "../App"

function toggleFavourite(favouriteState:State, setFavouriteState:Function){
    if(favouriteState === "non-star"){
      setFavouriteState("star")
      console.log('star')
    }else if(favouriteState === "star"){
      setFavouriteState("non-star")
      console.log(' star')
    }
  }

export default toggleFavourite