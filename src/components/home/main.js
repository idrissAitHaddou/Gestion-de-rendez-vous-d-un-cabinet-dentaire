import {
    NavLink
  } from "react-router-dom";
import ImgIdriss from "../../images/doctor.png";

function Main() {
  return (
    <>
      <div className="bg-blue-200">
        <section className="text-gray-600 body-font bg-red-200 rounded-br-full">
          <div className="container mx-auto flex px-5 py-18 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Welcome to Dr. IDRISS Clinic
              </h1>
              <p className="mb-8 leading-relaxed">
                The clinic specializes in cosmetic dentistry, gum disease
                treatment, implants and orthodontics, and is equipped with the
                latest generation of equipment to ensure high quality As soon as
                you arrive, a team consisting of an assistant and a dentist will
                take care of you and provide you with the greatest care and in
                the best conditions.
              </p>
              <div className="flex justify-center">
              {
                  localStorage.getItem('id')!=null ?  
                    <NavLink to="/appointment">
                      <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                         Rendez-vous
                      </button>
                    </NavLink>
                  : ''
               }

              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={ImgIdriss}
              ></img>
            </div>
          </div>
        </section>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <h2 className="text-xl text-gray-900 font-medium title-font mb-2 md:w-2/5">
            We are at your disposal for inquiries about sponsorship, tariffs and
            office operation.
          </h2>
          <div className="md:w-3/5 md:pl-6">
            <p className="leading-relaxed text-base">
              We will listen to your needs and will recommend the treatment that
              guarantees the best results.
            </p>
            <div className="flex md:mt-4 mt-6">
              
               {
                  localStorage.getItem('id')!=null ?  
                    <NavLink to="/appointment">
                      <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">
                        Rendez-vous
                      </button>
                    </NavLink>
                  : ''
               }
               
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Main;
