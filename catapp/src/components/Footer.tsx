import {FC} from 'react';


export interface Footerprops  {

}

export const Footer: FC<Footerprops> = ({}) => {

return <div className=' max-w-8xl px-2 sm:px-6 lg:px-8 bg-gray-500 dark:bg-gray-700 brightness-105 shadow-md text-center sticky bottom-0 '>
        <small className='text-white font-thin'>WEBSITE BY JACK PENDER</small>
    </div>
}

export default Footer