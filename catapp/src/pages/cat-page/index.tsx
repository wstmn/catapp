import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid"
import Sidebar from "../../components/sidebar/Sidebar"

const CatPage = () => {
    return(
        
        <div>
          <Sidebar />
        <div className='bg-gray-500 dark:bg-gray-700 border-gray-200 sticky top-0 z-10'>
          <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
            <div className="flex items-center">
              <img src="./src/assets/catIcon.png" className="w-20 h-20 mr-4" alt="Cat Icon" />
              <div>
                <h1 className="text-2xl font-bold mb-2 text-white">Wasteman</h1>
                <p className="text-sm text-gray-300">Add Cats</p>
                {/* Add more user information as needed */}
              </div>
            </div>
            <div className="flex items-center">
              {/* Add your ArrowLeftStartOnRectangleIcon component here */}
              <ArrowLeftStartOnRectangleIcon className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    )
}

export default CatPage 