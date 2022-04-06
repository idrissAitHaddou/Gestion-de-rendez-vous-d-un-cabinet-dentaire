import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "../home/home.js";
import RendezVous from "../rendezVous.js";
import Profile from "../profile/profile.js";

function hideDropdown() {
  const hideDropdown = document.getElementById("dropdown");
  hideDropdown.classList.add("hidden");
}


function logout()
{
  localStorage.removeItem('id')
  localStorage.removeItem('email')
  window.location = "http://localhost:3000/";
}


function isLogged() {
  return <div>
                  <div class="relative flex">
                              <span className="mr-2 text-sm">{localStorage.getItem('id')}</span>
                              <img class="h-8 w-8 rounded-full" id="dropdownDefault" data-dropdown-toggle="dropdown" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                              {/* <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}
                  </div>
                  <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                    
                      <li className='flex items-center pl-2 hover:bg-gray-100'>
                          <FontAwesomeIcon icon={faUser} className="ring-2 ring-white p-2" />
                          <button onClick={()=>hideDropdown()}>
                                <NavLink to="/profile" class="block py-2 px-4 dark:hover:bg-gray-600 dark:hover:text-white">Profile</NavLink>
                          </button>
                      </li>
                      <li onClick={()=>logout()} className='flex items-center pl-2 hover:bg-gray-100'>
                          <FontAwesomeIcon icon={faPowerOff} className=" ring-2 ring-white p-2" />
                          <button class="block py-2 px-4 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
                      </li>
                      </ul>
                  </div>
          </div>
}


function isNotLogged() {
  return <div>
              <button
                className="mr-3 inline-flex hover:text-white text-gray-900 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                type="button"
                data-modal-toggle="authentication-modal"
              >
                Sign in
              </button>
              <button
                className="inline-flex hover:text-white text-gray-900 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
                type="button"
                data-modal-toggle="register-modal"
              >
                Sign up
              </button>
          </div>
}

function Appointment() {
  return  <NavLink to="/appointment" className="mr-5 hover:text-gray-900">
             Appointment
          </NavLink>
        
}






function Header() {
  return (
    <Router>
      <header className="text-gray-600 body-font border-b-4 border-indigo-500">
        <div className="container mx-auto flex flex-wrap px-5 flex-col md:flex-row items-center py-2">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">IDRISS</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <NavLink to="/" className="mr-5 hover:text-gray-900">
              Home
            </NavLink>
             {
                 localStorage.getItem('id')!=null ? Appointment() : ""
             }
          </nav>


          {
            localStorage.getItem('id')!=null ? isLogged() : isNotLogged()
          }



        </div>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/appointment" component={RendezVous} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default Header;
