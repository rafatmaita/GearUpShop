// import React from 'react'

// function SignUp() {
//   return (
//     <div>
//         <>
//   {/* component */}
//   <div className="bg-grey-lighter min-h-screen flex flex-col">
//     <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
//       <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
//         <h1 className="mb-8 text-3xl text-center">Sign up</h1>
//         <input
//           type="text"
//           className="block border border-grey-light w-full p-3 rounded mb-4"
//           name="fullname"
//           placeholder="Full Name"
//         />
//         <input
//           type="text"
//           className="block border border-grey-light w-full p-3 rounded mb-4"
//           name="email"
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           className="block border border-grey-light w-full p-3 rounded mb-4"
//           name="password"
//           placeholder="Password"
//         />
//         <input
//           type="password"
//           className="block border border-grey-light w-full p-3 rounded mb-4"
//           name="confirm_password"
//           placeholder="Confirm Password"
//         />
//         <button
//           type="submit"
//           className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
//         >
//           Create Account
//         </button>
//         <div className="text-center text-sm text-grey-dark mt-4">
//           By signing up, you agree to the
//           <a
//             className="no-underline border-b border-grey-dark text-grey-dark"
//             href="#"
//           >
//             Terms of Service
//           </a>{" "}
//           and
//           <a
//             className="no-underline border-b border-grey-dark text-grey-dark"
//             href="#"
//           >
//             Privacy Policy
//           </a>
//         </div>
//       </div>
//       <div className="text-grey-dark mt-6">
//         Already have an account?
//         <a
//           className="no-underline border-b border-blue text-blue"
//           href="../login/"
//         >
//           Log in
//         </a>
//         .
//       </div>
//     </div>
//   </div>
// </>

//     </div>
//   )
// }

// export default SignUp



import React from 'react';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('Token')}`;

function SignUp() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      username: event.target.fullname.value,
      email: event.target.email.value,
      password: event.target.password.value,
      // confirm_password: event.target.confirm_password.value,
    };

    try {
      // Make a POST request to the server
      await axios.post('http://localhost:5002/signup', formData);

      // Handle success, e.g., show a success message or redirect
      console.log('User created successfully');

      // Show an alert message
      alert('User created successfully!');

    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error creating user:', error);
    }
  };

  return (
    <>
      {/* component */}
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-indigo-200 px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
              />
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-indigo-900 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="text-grey-dark mt-6">
            Already have an account?
            <a
              className="no-underline border-b border-blue text-blue"
              href="../login/"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;






























































