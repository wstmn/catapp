import { FC, useMemo, useState } from 'react'
import useFetch ,{ cat, catImage, useCatApi } from '../hooks/useFetch';



export interface CatModalprops {
    cat: cat;
    onClose: () => void;
    onFavourite: (catId: string) => void;
}


export const CatModal: FC<CatModalprops> = ({ cat, onClose, onFavourite }) => {

    const [catImage, setCatImage] = useState<catImage>();

    const { getImage } = useCatApi();

    useMemo(() => {
        const fetchData = async (id: string) => {
            try {
                const data: catImage = await getImage(id);
                setCatImage(data)
                console.log(data + "cat IMAGE data")
            } catch (error) {
                // Handle errors if needed
                console.error('Error fetching data:', error);
            }
        };

        fetchData(cat.id)
    }, [cat.id])

    return <div onClick={onClose} className='fixed z-10 inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>

        <div className='bg-slate-900 text-center p-10 font-roboto border-white border-4 rounded max-w-xl max-h-xl'>

            <p className='p-1 text-white bg-slate-900 hover:brightness-90 rounded-2xl'>Breed: {cat.breed ? cat.breed : "No Data"}</p>
            <p className='p-1 text-white bg-slate-900 hover:brightness-90 rounded-2xl'>Country: {cat.country ? cat.country : "No Data"}</p>
            <p className='p-1 text-white bg-slate-900 hover:brightness-90 rounded-2xl'>Life Span: {cat.lifeSpan ? cat.lifeSpan : "No Data"}</p>
            <img src={catImage?.imageURL} className='max-w-l border-2 border-gray-500' />
            <p className='p-1 text-white bg-slate-900 hover:brightness-90 rounded-2xl mx-50 font-thin'>{cat.description}</p>

            <button onClick={() => onFavourite && onFavourite(cat.id)} className='mx-100 cursor-pointer rounded-2xl invert w-10 h-10' > {cat.favourite ? "⭐" : "✰"}</button>
        </div>
    </div>

}

export default CatModal