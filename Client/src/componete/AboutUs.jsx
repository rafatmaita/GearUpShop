import React from 'react'

function AboutUs() {
  return (
    <div>

{/* <section className="bg-gray-100">
  <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <div className="max-w-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Us
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis eros
          at lacus feugiat hendrerit sed ut tortor. Suspendisse et magna quis
          elit efficitur consequat. Mauris eleifend velit a pretium iaculis.
          Donec sagittis velit et magna euismod, vel aliquet nulla malesuada.
          Nunc pharetra massa lectus, a fermentum arcu volutpat vel.
        </p>
        <div className="mt-8">
          <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
            Learn more about us
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
      <div className="mt-12 md:mt-0">
        <img
          src="https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2021/11/03073858/Car-Parts-031120211219-420x230.jpg"
          alt="About Us Image"
          className="object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</section> */}


<div className="flex flex-wrap ">
  <div className="w-full sm:w-8/12 mb-10">
    <div className="container mx-auto h-full sm:p-10 ">
      <nav className="flex px-4 justify-between items-center">
        <div className="text-4xl font-bold">
          Plant<span className="text-green-700">.</span>
        </div>
        <div>
          <img
            src="https://image.flaticon.com/icons/svg/497/497348.svg"
            alt=""
            className="w-8"
          />
        </div>
      </nav>
      <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Find your <span className="text-green-700">greeny</span> stuff for
            your room
          </h1>
          <div className="w-20 h-2 bg-green-700 my-4" />
          <p className="text-xl mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            maiores neque eaque ea odit placeat, tenetur illum distinctio nulla
            voluptatum a corrupti beatae tempora aperiam quia id aliquam
            possimus aut.
          </p>
          <button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
            Learn More
          </button>
        </div>
      </header>
    </div>
  </div>
  <img
    src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    alt="Leafs"
    className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
  />
</div>


    </div>
  )
}

export default AboutUs