import react, { Component } from "react";
import axios from "axios";
import { async } from "q";
class RendezVous extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sujet: '',
      date: '',
      id: 0,
      val: '',
      idTime: 0,
      Appointment: [],
    };
  }


   updateAppointment = async (e , id) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("sujet", document.getElementById('sujet').value);
    formdata.append("date", document.getElementById('date').value);
    formdata.append("id", id);
    formdata.append("id_time", document.getElementById('times'+id).value);

    try {
      const response = await axios.post(
        "http://rdv.ma/rdv/update/",
        formdata
      );
      const data = await response.data;
      if (data) {
        window.location = "http://localhost:3000/profile"; 
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    
  }


    deleteAppointment = async(id) => {

    let formdata = new FormData();
    formdata.append("id", id);

    try {
      const response = await axios.post(
        "http://rdv.ma/rdv/delete/",
        formdata
      );
      const data = await response.data;
      if (data) {
        window.location = "http://localhost:3000/profile";
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }


  async componentDidMount(){
      try {
        let formdata = new FormData();
        formdata.append("id", localStorage.getItem("id"));
        const response = await axios.post(
          "http://rdv.ma/rdv/index/", formdata
        );
        const data = await response.data;
        if (data) {
          console.log(data)
          this.setState({ Appointment : data });
          console.log(this.state.Appointment);
        }
      } catch (error) {
        console.log(error);
      }
  
  };



   handleDate = async(id , id_time , val) => {

    let inputDate = document.getElementById("date").value;
    this.setState({date : inputDate});
    
      try {

        let inputTime = document.getElementById("times"+id);
        inputTime.innerHTML="";

        let optionS = document.createElement('option');
        optionS.textContent = val
        optionS.value = id_time;
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

             console.log(data['rows'])
            if(data['rows']===0 || data['rows']===false && data['time']['val']!==val)
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


  showModal = (id) => {
       const modal = document.getElementById('edit-modal'+id);
       modal.classList.toggle('hidden');
  }

  showModalDelete = (id) => {
    const modalDelete = document.getElementById('popup-modal'+id);
    modalDelete.classList.toggle('hidden');
  }



  render() {
  return (
    <>
      <div className="mt-10 sm:mt-0 w-9/12 mx-auto">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Your Appointment
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                He has access to modify or delete these appointments.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Sujet
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                        <th
                          scope="col-2"
                          colspan="2"
                          className="px-6 py-3 text-center"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Appointment.map((item , index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {item.sujet}
                          </th>
                          <td className="px-6 py-4">{item.date}</td>
                          <td className="px-6 py-4">{item.val}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              data-modal-toggle={"edit-modal".concat(item.id)}
                              className="text-blue-600"
                              onClick={()=> this.showModal(item.id)}
                            >
                              {/* <a
                                href="#"
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              > */}
                                Edit
                              {/* </a> */}
                            </button>

                            {/* ----------------- start modal of edit Appointment  ------------------------ */}

                            <div
                              id={"edit-modal".concat(item.id)}
                              tabindex="-1"
                              aria-hidden="true"
                              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
                            >
                              <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative border border-2 bg-white rounded-lg shadow dark:bg-gray-700">
                                  <div className="flex justify-end p-2">
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                      data-modal-toggle={"edit-modal".concat(item.id)}
                                      onClick={()=> this.showModal(item.id)}
                                    >
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
                                  <form
                                    onSubmit={(e)=> this.updateAppointment(e , item.id)}
                                    className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                                    action="#"
                                  >
                                    <h3 className="text-left text-xl font-medium text-gray-900 dark:text-white">
                                      Edit your Appointment
                                    </h3>
                                    <div>
                                      <label
                                        for="sujet"
                                        className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-gray-300"
                                      >
                                        Sujet
                                      </label>
                                      <input
                                      defaultValue={item.sujet}
                                        type="text"
                                        name="text"
                                        id="sujet"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder=""
                                        required=""
                                      />
                                    </div>
                                    <div>
                                      <label
                                        for="date"
                                        className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                      >
                                        Date
                                      </label>
                                      <input
                                      defaultValue={item.date}
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        required=""
                                        onChange={() => this.handleDate(item.id , item.id_time , item.val)}
                                      />
                                    </div>
                                    <div>
                                      <select
                                        id={"times".concat(item.id)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={item.id_time}
                                      >
                                        <option value="1">09:00 AM</option>
                                        <option value="2">11:00 AM</option>
                                        <option value="3">14:00 PM</option>
                                        <option value="4">16:00 PM</option>
                                      </select>
                                    </div>
                                    <div className="flex justify-between"></div>
                                    <button
                                      type="submit"
                                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      Edit
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>

                            {/* ----------------- end modal of edit Appointment  ------------------------ */}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              data-modal-toggle={"popup-modal".concat(index)}
                              onClick={()=> this.showModalDelete(index)}
                            >
                              {/* <a
                                href="#"
                                className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                              > */}
                                delete
                              {/* </a> */}
                            </button>

                            {/* ------------------ start modal to delete ------------------ */}

                            <div
                              id={"popup-modal".concat(index)}
                              tabindex="-1"
                              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
                            >
                              <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
                                {/* <!-- Modal content --> */}
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                  {/* <!-- Modal header --> */}
                                  <div className="flex justify-end p-2">
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                      data-modal-toggle={"popup-modal".concat(index)}
                                      onClick={()=> this.showModalDelete(index)}
                                    >
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
                                  {/* <!-- Modal body --> */}
                                  <div className="p-6 pt-0 text-center">
                                    <svg
                                      className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      ></path>
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to delete this
                                      Appointment?
                                    </h3>
                                    <button
                                      data-modal-toggle="popup-modal"
                                      type="button"
                                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                      onClick={()=> this.deleteAppointment(item.id)}
                                    >
                                      Yes, I'm sure
                                    </button>
                                    <button
                                      data-modal-toggle="popup-modal"
                                      type="button"
                                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                      onClick={()=> this.showModalDelete(index)}
                                    >
                                      No, cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ------------------ end modal to delete ------------------- */}
                          </td>
                        </tr>
                      ))} 
                    </tbody>
                  </table>
                </div>
              </div>
          
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <br />
      <br />
      <br />



    </>
  )};
}

export default RendezVous;
