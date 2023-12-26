import * as React from 'react';
import { Cats, catsProps } from './Cats';
import { cat } from '../pages/home-page';

interface props{
    cats:cat[];
    handleOpen: (catObj:cat) => void;
}


const CatsList:React.FC<props> = ({cats, handleOpen}) => {

  return <>
  {cats && cats?.map((cat) => {
    return <Cats key={cat.id} catObj={cat} onOpen={handleOpen}/>
})} </>

}

export default CatsList;
