import React,{useState} from 'react'
import axios from 'axios';


function SignUp() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [birthday, setBirthday] = useState("");

    const [errorfirstname, setErrorfirstname] = useState(true);
    const [errorlastname, setErrorlastname] = useState(true);
    const [erroremail, setErroremail] = useState(true);
    const [errorage, setErrorage] = useState(true);
    const [errorbirthday, setErrorbirthday] = useState(true);

    function handleFirstname()
    {
      let inputFirstname = document.getElementById('firstname').value;
      setFirstname(inputFirstname);
      inputFirstname==="" ? setErrorfirstname(true) : setErrorfirstname(false);
    }

    function handleLasttname()
    {
      let inputLastname = document.getElementById('lastname').value;
      setLastname(inputLastname);
      inputLastname==="" ? setErrorlastname(true) : setErrorlastname(false);
    }

    function handleEmail()
    {
      let inputEmail = document.getElementById('emailR').value;
      setEmail(inputEmail);
      inputEmail==="" ? setErroremail(true) : setErroremail(false);
    }

    function handleAge()
    {
      let inputAge = document.getElementById('age').value;
      setAge(inputAge);
      inputAge==="" ? setErrorage(true) : setErrorage(false);
    }

    function handleBirthday()
    {
      let inputBirthday = document.getElementById('birthday').value;
      setBirthday(inputBirthday);
      inputBirthday==="" ? setErrorbirthday(true) : setErrorbirthday(false);
    }



    //** function to register user */
   async function register(e)
    {
      e.preventDefault();

     if(errorfirstname===false && errorlastname===false && erroremail===false && errorage===false && errorbirthday===false)
     {
        let formdata = new FormData();
        formdata.append('nom' , firstname);
        formdata.append('prenom' , lastname);
        formdata.append('email' , email);
        formdata.append('age' , age);
        formdata.append('date_naissence' , birthday);

        try{
           const response = await axios.post('http://rdv.ma/client/store' , formdata);
           const data = await response.data;
           if(data)
           {
             localStorage.setItem('id' , data['ref'])
             localStorage.setItem('email' , data['email'])
             window.location="http://localhost:3000/";
           }else{

           } 
           
        }catch(error){
           console.log(error)
        }
        

     }
    }



    return (
 
        <div
        id="register-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
      >
        <div className="relative p-4 w-full max-w-3xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
            <a href="http://localhost:3000/">
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-toggle="register-modal"
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
            </a>
            </div>
            {/* --------------------------------- */}

            <form className="p-3" onSubmit={(e)=>register(e)}>
              <div className="grid lg:grid-cols-2 lg:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="firstname"
                    id="firstname"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onKeyUp={()=> handleFirstname()}
                    defaultValue={firstname}
                  />
                  <label
                    htmlFor="firstname"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                  <span className='text-sm text-red-500'>{ errorfirstname ? "enter your first name" : "" }</span>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onKeyUp={()=> handleLasttname()}
                    defaultValue={lastname}
                  />
                  <label
                    htmlFor="lastname"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                  <span className='text-sm text-red-500'>{ errorlastname ? "enter your last name" : "" }</span>
                </div>
              </div>
              <div className="grid lg:grid-cols-2 lg:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="number"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="age"
                    id="age"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onKeyUp={()=> handleAge()}
                    defaultValue={age}
                  />
                  <label
                    htmlFor="age"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Age
                  </label>
                  <span className='text-sm text-red-500'>{ errorage ? "enter your age" : "" }</span>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onChange={()=> handleBirthday()}
                  />
                  <label
                    htmlFor="birthday"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Birthday
                  </label>
                  <span className='text-sm text-red-500'>{ errorbirthday ? "enter your birthday" : "" }</span>
                </div>
              </div>
              <div className="grid lg:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="emailR"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="emailR"
                    id="emailR"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onKeyUp={()=> handleEmail()}
                    defaultValue={email}
                  />
                  <label
                    htmlFor="emailR"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                  <span className='text-sm text-red-500'>{ erroremail ? "enter your email" : "" }</span>
                </div>
                
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </form>

            {/* ----------------------------------- */}
          </div>
        </div>
      </div>
        
  
    );
  }
  
  export default SignUp;
  