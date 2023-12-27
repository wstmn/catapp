import * as React from 'react';
import { Cats } from './Cats';
import { cat } from '../hooks/useFetch';


interface props {
  cats: cat[];
  handleOpen: (catObj: cat) => void;
}


const CatsList: React.FC<props> = ({ cats, handleOpen }) => {

  return <>
    {cats && cats?.map((cat) => {
      return <Cats key={cat.id} catObj={cat} onOpen={handleOpen} />
    })} </>

}

export default CatsList;
