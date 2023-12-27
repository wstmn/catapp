import { useState } from "react";
import axios from "axios";




export interface cat {
  breed: string,
  country: string,
  origin: string,
  coat: string,
  pattern: string,
  favourite: boolean,
  id: string,
  description: string,
  adaptability: string,
  lifeSpan: string
}

export interface catImage {
  id: string,
  imageURL: string
}


export function useCatApi() {

  const baseURL = 'https://api.thecatapi.com/v1/';
  const [isPending, setIsPending] = useState<boolean>(false);

  const getCats = async (): Promise<cat[]> => {
    let data: cat[] = [];
    try {
      setIsPending(true);
      const response = await axios.get(
        baseURL + 'breeds/'
      );
      data = response.data;

      data = data.map((catData: any) => ({
        breed: catData.name,
        country: catData.origin,
        origin: catData.origin,
        coat: catData.coat,
        pattern: catData.pattern,
        favourite: catData.favourite,
        id: catData.id,
        description: catData.description,
        adaptability: catData.adaptabilty,
        lifeSpan: catData.life_span
      }));

      console.log(data + "------------------------");
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
    return data;
  };

  const getImage = async (id: string): Promise<catImage> => {
    let catImages: catImage = {} as catImage;

    const url = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${id}&api_key=live_XGZNbsi3MDtyc9sQkCFPzyGYAIuXgLDal3rbziJ3XuGWKjz1ce3YuIpvGLzd1HX9`;
    
    try {
      setIsPending(true);
      const response = await axios.get(url);

      catImages = {
        id: response.data[0].id,
        imageURL: response.data[0].url,
      };

      console.log(catImages)
      // Assuming imageData is an array containing the images

    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  
    return catImages;
  };


  return { getCats, getImage };
}

export default useCatApi;
