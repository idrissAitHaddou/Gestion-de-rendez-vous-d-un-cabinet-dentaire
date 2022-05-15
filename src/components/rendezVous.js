import react,{useState , useEffect} from 'react'
import axios from 'axios';
import ImgIdriss from "../images/appointment.png";
import { async } from 'q';



function RendezVous() {

  const [datetoday, setDatetoday] = useState("");
  const [sujet, setSujet] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [errorsujet, setErrorsujet] = useState(true);
  const [errordate, setErrordate] = useState(true);
  const [errortime, setErrorTime] = useState(true);
  const [errorAdded, setErrorErroradded] = useState(0);

  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    setDatetoday(date);
  });

  function handleSujet() {
    let inputSujet = document.getElementById("sujet").value;
    setSujet(inputSujet);
    inputSujet === "" ? setErrorsujet(true) : setErrorsujet(false);
  }

 async function handleDate() {

    let inputDate = document.getElementById("date").value;
    setDate(inputDate);
    inputDate === "" ? setErrordate(true) : setErrordate(false);
      try {

        let inputTime = document.getElementById("time");
        inputTime.innerHTML="";
        let optionS = document.createElement('option');
        optionS.textContent ='select time'
        optionS.setAttribute('selected' , '')
        optionS.setAttribute('disabled' , '')
        optionS.value = "";
        inputTime.append(optionS);


        for(let i=1 ; i<5 ; i++)
        {
          let formdata = new FormData();
          formdata.append("date", inputDate );
          formdata.append("id_time", i );
          const response = await axios.post(
            "http://rdv.ma/rdv/getTimes",
            formdata
          );
          const data = await response.data;
          if (data) {

            if(data['rows']==0)
            {
              let option = document.createElement('option');
              option.textContent = data['time']['val']
              option.value = i;
              inputTime.append(option);
            }

          }
        } 

      } catch (error) {
        console.log(error);
      }

  }


  function handleTime() {
    let inputTime = document.getElementById("time").value;
    setTime(inputTime);
    inputTime === "" ? setErrorTime(true) : setErrorTime(false);
  }


    //** function to register user */
    async function addRendezVous(e) {
      e.preventDefault();

      let today = new Date();
      let dateIn = date.split('-');
      
    if(dateIn[0]<today.getFullYear()){
        alert("Please enter a valid year.");
        console.log("error year")
    }
    else if(dateIn[1]<(today.getMonth()+1)){
      alert("Please enter a valid month.");
        console.log("error month")
    }
    else if(dateIn[2]<today.getDate()){
      alert("Please enter a valid day.");
        console.log("error day")
    }
    else if (
        errorsujet === false &&
        errordate === false  &&
        errortime === false
      ) {
        let formdata = new FormData();
        formdata.append("id_user", localStorage.getItem("id"));
        formdata.append("sujet", sujet);
        formdata.append("date", date);
        formdata.append("id_time", time);
  
        try {
          const response = await axios.post(
            "http://rdv.ma/rdv/store",
            formdata
          );
          const data = await response.data;
          if (data['status']==='inserted') {
            setErrorErroradded(1)
          }else
          {
            setErrorErroradded(2)
          } 
        } catch (error) {
            setErrorErroradded(3)
        }
      }else
      {
        console.log('vide')
      }
    }



  return (
    <>
    <div className="bg-blue-200">
      <section className="text-gray-600 body-font bg-red-200 rounded-br-full">
        <div className="container mx-auto flex px-5 py-18 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <form onSubmit={(e)=>addRendezVous(e)} className="w-full d-flex mx-auto p-8 border border-sky-500 rounded-md mt-10">
              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative text-left z-0 mb-6 w-full group">
                  <textarea
                    type="text"
                    id="sujet"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onKeyUp={() => handleSujet()}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Sujet
                  </label>
                  <span className='text-sm text-red-500'>{ errorsujet ? "enter your sujet" : "" }</span>
                </div>

                <div className="relative text-left z-0 mb-6 w-full group">
                  <input
                    type="date"
                    id="date"
                    min={datetoday}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required=""
                    onChange={() => handleDate()}
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Date
                  </label>
                  <span className='text-sm text-red-500'>{ errordate ? "enter your date" : "" }</span>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                  <select
                    id="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={() => handleTime()}
                  >
                    <option value="" disabled selected>
                      select time
                    </option>

                  </select>
                  <span className='text-sm text-red-500'>{ errortime ? "select time" : "" }</span>
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send a Appointment
              </button>
            </form>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={ImgIdriss}
              height="300"
            ></img>
          </div>
        </div>
      </section>
    </div>

{
  errorAdded===1 ?

    <div id="alert-3" class="absolute top-24 right-0 flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
        <svg class="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
          your appointment is inserted , thank your for visit our platform
        </div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert-3" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    : errorAdded===2 ?
    <div id="alert-2" class="absolute top-24 right-0 flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
      <svg class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
      your appointment is not inserted , can you confirm your information
      </div>
      <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>

    : errorAdded===3 ?

    <div id="alert-2" class="absolute top-24 right-0 flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
      <svg class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
       one error in connection !!!!
      </div>
      <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
    :''

}

 </>
  );
}

export default RendezVous;
