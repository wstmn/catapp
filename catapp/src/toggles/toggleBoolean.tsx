function toggleBoolean (fav:boolean, setFav:Function) {
    if(fav === false){
      setFav(true)
    }else{
      setFav(false)
    }
  }

export default toggleBoolean