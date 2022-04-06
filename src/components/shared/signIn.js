import React,{useState} from 'react'
import axios from 'axios';


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erroremail, setErroremail] = useState(true);
  const [errorpassword, setErrorpassword] = useState(true);

  function handleEmail() {
    let inputEmail = document.getElementById("email").value;
    setEmail(inputEmail);
    inputEmail === "" ? setErroremail(true) : setErroremail(false);
  }

  function handlePassword() {
    let inputPassword = document.getElementById("password").value;
    setPassword(inputPassword);
    inputPassword === "" ? setErrorpassword(true) : setErrorpassword(false);
  }

  //** function to hide modal of login */
  function hideLogin() {
    const hideLogin = document.getElementById("authentication-modal");
    hideLogin.classList.add("hidden");
  }

  //** function to register user */
  async function login(e) {
    e.preventDefault();

    if (
      erroremail === false &&
      errorpassword === false 
    ) {
      let formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      try {
        const response = await axios.post(
          "http://rdv.ma/client/show",
          formdata
        );
        const data = await response.data;
        if (data) {
          localStorage.setItem('email' , data['email'])
          localStorage.setItem('id' , data['id'])
          window.location = "http://localhost:3000/";
        } else {
         
        }
      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
            action="#"
            onSubmit={(e)=>login(e)}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in our platform
            </h3>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                required=""
                onKeyUp={() => handleEmail()}
              />
              <span className='text-sm text-red-500'>{ erroremail ? "enter your email" : "" }</span>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
                onKeyUp={() => handlePassword()}
              />
              <span className='text-sm text-red-500'>{ errorpassword ? "enter your password" : "" }</span>
            </div>
            <div className="flex justify-between"></div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
                // data-modal-toggle="authentication-modal"
                data-modal-toggle="register-modal"
                onClick={() => hideLogin()}
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
