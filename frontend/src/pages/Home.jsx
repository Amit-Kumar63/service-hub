import ServiceCard from '../components/ServiceCard'
import NavigationBar from '../components/NavigationBar'
import { useNavigate } from 'react-router-dom'
import { useGetServicesQuery} from '../app/api/api'
import { CircularProgress } from "@mui/material";

const Home = () => {
  const token = localStorage.getItem('token')

  const { data: services, isLoading: isServicesLoading, isError } = useGetServicesQuery(undefined)
    
  const navigate = useNavigate()
  return (
    <div className='w-full h-screen font-montserrat py-5 px-4'>
        <div className='flex items-center justify-between w-full'>
        <h2 className='text-lg font-bold w-full text-center'>Services</h2>
        {
          token ? <i className="text-2xl plas ri-shopping-cart-2-line"></i> : <i onClick={()=> navigate('/login') } className="text-2xl plas ri-user-3-line"></i>
        }
        </div>
        <div className='mt-8 relative'>
        <i className="text-gray-600 text-2xl absolute top-[18%] left-4 ri-search-line"></i>
            <input className='w-full py-3 px-4 pl-12 placeholder:text-base placeholder:text-gray-500 rounded-lg bg-[#E8EEF2]' type="search" placeholder='Search for service' />
        </div>
        <div className='mt-8 w-full'>
          <h1 className='text-2xl font-bold'>All services</h1>
          {
            isServicesLoading ? (
              <div className='w-full h-full flex justify-center items-center mt-16'>
                <CircularProgress />
              </div>
            ) : 
          (
            <div className='mt-8 space-y-7 pb-24'>
            {
              services?.uniqueServiceType.map((service, key) => (
                <ServiceCard key={key} serviceType={service}/>
              ))
            }
          </div>
          )
          }
        </div>
    </div>
  )
}

export default Home