import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
  return (
    <div>
      
      <>
      
  {/* component */}
  <div className="flex justify-center items-center ">
    {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
    <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full  ">
      <div className="flex flex-col jusitfy-center items-center space-y-10  ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 dark:text-white">
            Shop By Category
          </h1>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 md:gap-x-8 md:gap-x-8 w-full  ">
          <div className="relative group flex justify-center items-center h-80 w-full bg-blue-600/30 backdrop-brightness-75 ">
            <img
              className="object-center object-cover h-full w-full "
              src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/645ed1d7dc86fe001d010a5f.jpg"
              alt="girl-image"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white ">
            
            <Link to='/clean' >
            Clean
            </Link>
            </button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
          </div>
          <div className="relative group flex justify-center items-center h-80 w-full bg-blue-600/30 backdrop-brightness-75">
            <img
              className="object-center object-cover h-full w-full"
              src="https://m.media-amazon.com/images/I/71bCyrGXmUL._AC_UF1000,1000_QL80_.jpg"
              alt="girl-image"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
            
            <Link to='/light' >
            Light
            </Link>
            </button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
          </div>
          <div className="relative group flex justify-center items-center h-80 w-full bg-blue-600/30 backdrop-brightness-75">
            <img
              className="object-center object-cover h-full w-full"
              src="https://aschilo.com/wp-content/uploads/tool-equip.jpg"
              alt="girl-image"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
              <Link to='/tools' >
              Tools
            </Link>
            </button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
          </div>
          
          <div className="relative group flex justify-center items-center h-80 w-full bg-blue-600/30 backdrop-brightness-75 my-6">
            <img
              className="object-center object-cover h-full w-full"
              src="https://d3lp4xedbqa8a5.cloudfront.net/imagegen/max/ccr/1023/-/s3/digital-cougar-assets/whichcar/2017/02/10/9240/Mobile-phone-holder-in-air-vent-in-car.jpg"
              alt="girl-image"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
            <Link to='/mobile' >
            Mobile
            </Link>
            </button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
          </div>

          <div className="relative group flex justify-center items-center h-80 w-full bg-blue-600/30 backdrop-brightness-75 my-6">
            <img
              className="object-center object-cover h-full w-full"
              src="https://i.ebayimg.com/images/g/jj0AAOSwlkNk3eH7/s-l1200.webp"
              alt="girl-image"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
            <Link to='/accessories' >
            Accessories
            </Link>
            </button>
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
          </div>

          <div className="relative group flex justify-center items-center h-80 w-full bg-blue-600/30 backdrop-brightness-75 my-6">
            <img
              className="object-center object-cover h-full w-full"
              src="https://images-na.ssl-images-amazon.com/images/I/71p9FLhJlEL._AC_UL330_SR330,330_.jpg"
              alt="girl-image"
            />
            <button className="dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
            <Link to='/seafety' >
            Seafety
            </Link>
            </button>
            
            <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
          </div>
         
         
       
         
          
        </div>
      
      </div>
    </div>
  </div>
  
</>

    </div>
  )
}

export default Categories