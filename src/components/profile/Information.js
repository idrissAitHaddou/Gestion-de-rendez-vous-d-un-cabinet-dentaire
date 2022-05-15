import react, { useState, useEffect } from "react";
import axios from "axios";
import { async } from "q";

function Information() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState("");

  const [errorAdded, setErrorAdded] = useState(0);

  function handleFirstname() {
    let inputFirstname = document.getElementById("firstname").value;
    setFirstname(inputFirstname);
  }

  function handleLasttname() {
    let inputLastname = document.getElementById("lastname").value;
    setLastname(inputLastname);
  }

  function handleEmail() {
    let inputEmail = document.getElementById("emailC").value;
    setEmail(inputEmail);
  }

  function handleAge() {
    let inputAge = document.getElementById("age").value;
    setAge(inputAge);
  }

  function handleBirthday() {
    let inputBirthday = document.getElementById("birthday").value;
    setBirthday(inputBirthday);
  }

  //** function to register user */
  async function updateProfile(e) {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("id_user", localStorage.getItem("id"));
    formdata.append("nom", firstname);
    formdata.append("prenom", lastname);
    formdata.append("email", email);
    formdata.append("age", age);
    formdata.append("date_naissence", birthday);

    try {
      const response = await axios.post(
        "http://rdv.ma/client/update/",
        formdata
      );
      const data = await response.data;
      if (data) {
        window.location = "http://localhost:3000/profile";
        setErrorAdded(1)
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getClient() {
      try {
        const response = await axios.get(
          "http://rdv.ma/client/index/" + localStorage.getItem("id")
        );
        const data = await response.data;
        if (data) {
          setFirstname(data["nom"]);
          setLastname(data["prenom"]);
          setAge(data["age"]);
          setEmail(data["email"]);
          setBirthday(data["date_naissence"]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getClient();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />

      <div className="sm:mt-0 w-9/12 mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You can edit your personal information.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => updateProfile(e)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        defaultValue={firstname}
                        type="text"
                        name="first-name"
                        id="firstname"
                        autocomplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        onKeyUp={() => handleFirstname()}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        defaultValue={lastname}
                        type="text"
                        name="last-name"
                        id="lastname"
                        autocomplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        onKeyUp={() => handleLasttname()}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        for="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        defaultValue={email}
                        type="email"
                        name="email-address"
                        id="emailC"
                        autocomplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        onKeyUp={() => handleEmail()}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>
                      <input
                        defaultValue={age}
                        type="text"
                        name="first-name"
                        id="age"
                        autocomplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        onKeyUp={() => handleAge()}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="birthday"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Birthday
                      </label>
                      <input
                        defaultValue={birthday}
                        type="text"
                        name="last-name"
                        id="birthday"
                        autocomplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        onKeyUp={() => handleBirthday()}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" ariaHidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      {errorAdded === 1 ? (
        <div
          id="alert-3"
          className="absolute top-24 right-0 flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
            your appointment is inserted , thank your for visit our platform
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
            data-dismiss-target="#alert-3"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : errorAdded === 2 ? (
        <div
          id="alert-2"
          className="absolute top-24 right-0 flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
            your appointment is not inserted , can you confirm your information
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
            data-dismiss-target="#alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : errorAdded === 3 ? (
        <div
          id="alert-2"
          className="absolute top-24 right-0 flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
            one error in connection !!!!
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
            data-dismiss-target="#alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Information;
