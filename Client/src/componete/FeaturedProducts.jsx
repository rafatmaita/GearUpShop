import React from 'react'

function FeaturedProducts() {
  return (
    <div>
          <section className="flex items-center font-poppins dark:bg-gray-800 lg:h-auto">
  <div className="container p-4 mx-auto">
    <h2 className="pb-2 text-2xl font-bold text-center text-gray-800 md:text-4xl dark:text-gray-400">
      Featured Products
    </h2>
    <div className="w-20 mx-auto mb-6 border-b border-red-700 dark:border-gray-400" />
    <div className="flex flex-wrap mb-20 -mx-3">
      <div className="w-full px-3 mb-6 lg:w-1/3 lg:mb-0">
        <div
          className="relative w-full h-64 mb-6 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage:
              'url("https://i.postimg.cc/x8LtrkfV/kenny-eliason-HIz-Gn9-FZDFU-unsplash.jpg")'
          }}
        >
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-60" />
          <span className="relative z-40 inline-block px-2 py-1 mt-4 ml-4 text-xs font-bold text-gray-100 bg-blue-500 rounded-full ">
            -10% off
          </span>
          <a className="absolute inset-0 flex items-end" href="#">
            <div className="pb-12 pl-12">
              <h2 className="mb-2 text-3xl font-bold text-white ">
                Digital Camera
              </h2>
              <p className="text-xl font-bold text-white ">
                <span>$100.00</span>
                <span className="text-sm font-normal line-through">900.00</span>
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="w-full px-3 mb-6 lg:w-1/3 lg:mb-0">
        <div
          className="relative w-full h-64 mb-6 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage:
              'url("https://i.postimg.cc/2y4KXDFs/pexels-terje-sollie-320617.jpg")'
          }}
        >
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-60" />
          <span className="relative z-40 inline-block px-2 py-1 mt-4 ml-4 text-xs font-bold text-gray-100 bg-blue-500 rounded-full ">
            New
          </span>
          <a className="absolute inset-0 flex items-end" href="#">
            <div className="pb-12 pl-12">
              <h2 className="mb-2 text-3xl font-bold text-white ">
                Bridge Camera
              </h2>
              <p className="text-xl font-bold text-white ">
                <span>$100.00</span>
                <span className="text-sm font-normal line-through">900.00</span>
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className="w-full px-3 mb-6 lg:w-1/3 lg:mb-0">
        <div
          className="relative w-full h-64 mb-6 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage:
              'url("https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg")'
          }}
        >
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-60" />
          <span className="relative z-40 inline-block px-2 py-1 mt-4 ml-4 text-xs font-bold text-gray-100 bg-blue-500 rounded-full ">
            New
          </span>
          <a className="absolute inset-0 flex items-end" href="#">
            <div className="pb-12 pl-12">
              <h2 className="mb-2 text-3xl font-bold text-white ">
                DSLR Camera
              </h2>
              <p className="text-xl font-bold text-white ">
                <span>$100.00</span>
                <span className="text-sm font-normal line-through">900.00</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default FeaturedProducts