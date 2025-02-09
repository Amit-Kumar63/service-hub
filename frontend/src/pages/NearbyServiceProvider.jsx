import React, { useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ServiceProviderPop from "../components/ServiceProviderPop";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import BookService from "../components/BookService";
import { useGetAddToFavMutation, useGetNearbyProvidersQuery } from "../app/api/api";
import { CircularProgress } from '@mui/material';
import HeartOutlineIcon from '@mui/icons-material/FavoriteBorder';
import HeartIcon  from '@mui/icons-material/Favorite';

const NearbyServiceProvider = () => {
  const { user, token } = useOutletContext()
    const [servicePanel, setServicePanel] = useState(false);
    const [bookServicePanel, setBookServicePanel] = useState(false);
    const [error, setError] = useState('')
    const [coords, setCoords] = useState('')
    const [useCurrentLocationToFetch, setUseCurrentLocationToFetch] = useState(false)
    const [selectedProviderId, setSelectedProviderId] = useState('')
    const [selectedServicePrice, setSelectedServicePrice] = useState(0)
    const [isFav, setIsFav] = useState([])

    const servicePanelRef = useRef()
    const bookServicePanelRef = useRef()
  
    const { serviceType  } = useParams()    

    const { lat, lng } = useCurrentLocationToFetch ? coords || {} : user?.user.location
        
    const { isLoading, data, isError, isSuccess, isFetching } = useGetNearbyProvidersQuery({ lat, lng, serviceType: serviceType.slice(1)}, {
        skip: !user
    });

    const [addToFav, { isLoading: addToFavLoading, isSuccess: addToFavSuccess, isError: addToFavError }] = useGetAddToFavMutation()

    useGSAP(()=> {
        if (servicePanel) {
            gsap.to(servicePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(servicePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [servicePanel])

    useGSAP(()=> {
      if (bookServicePanel) {       
          gsap.to(bookServicePanelRef.current, {
              transform: 'translateY(0)'
          })
      } else {        
          gsap.to(bookServicePanelRef.current, {
              transform: 'translateY(100%)'
          })
      }
  }, [bookServicePanel])

  const userCurrentLocationHandler = (e)=> {
    setUseCurrentLocationToFetch(!useCurrentLocationToFetch)

      if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setCoords({ lat:latitude, lng:longitude });
              },
              (error) => {
                  setError(error.message);
              },
              {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0,
              }
          );
      } else {
          setError('Geolocation is not supported by this browser.');
      }
  }

  const bookingHandler = (provider, price)=> {
    setBookServicePanel(true);
    setSelectedProviderId(provider._id)
    setSelectedServicePrice(price)
  }

  const addToFavouritesHandler = async (serviceId)=> {
   try {
     await addToFav({serviceId, token})
     if ( addToFavLoading ) {
       return <CircularProgress sx={{marginLeft: 'auto', marginRight: 'auto'}}/>
     }
     if (addToFavSuccess) {
       return <div className="text-green-600 text-center">Added to favourites</div>
     }
     if (addToFavError) {
       return <div className="text-red-600 text-center">Error adding to favourites</div>
     }
   } catch (error) {
    console.error('Error adding to favourites:', error)
   }
  }

  const toggleFavouritesHandler = (serviceId)=> {
    setIsFav((previousValue) => {
      if (!Array.isArray(previousValue)) {
        previousValue = [];
    }
      if (previousValue.includes(serviceId)) {
        return previousValue.filter((id) => id.toString() !== serviceId.toString())
      }
      else {
        return [...previousValue, serviceId]
      }
    }
    );
    addToFavouritesHandler(serviceId)
  }

  if (useCurrentLocationToFetch && !data) {
    return <div>No service providers found nearby from your current location. Please use saved location</div>
  }
  // check for error 

  return (
    <div className="bg-gray-100 h-screen flex flex-col pt-4 relative">
        <div className="w-full flex items-center justify-between px-4">
        <i onClick={()=> window.history.back()} className="text-2xl ri-arrow-left-line"></i>
        <h1 className="text-2xl font-bold text-center w-full">Services</h1>
        </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Nearby service providers</h2>
        <button onClick={userCurrentLocationHandler} 
        className={`w-full font-semibold py-3 text-nowrap mb-4 rounded ${useCurrentLocationToFetch ? 'bg-slate-700' : 'bg-gray-600'} text-white `}>{useCurrentLocationToFetch ? 'Use saved location' : 'Use current location'}</button>       
        {
          !isLoading && !data && (
            <div className="flex items-center justify-center mt-10 text-2xl font-bold text-center">No service providers found nearby <i className="text-lg ri-emotion-normal-fill"></i></div>
          )
        }
        {
          isLoading ? 
            (<div className="w-full flex items-center justify-center mt-10"><CircularProgress /></div>) : 
            (data?.nearbyProviders.map(({provider:provider, distance, services}, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow mb-4"
              >
                <div className="flex items-center pt-3 relative">
                  <img
                    src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg'
                    alt={provider.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{provider.name.charAt(0).toUpperCase() + provider.name.slice(1) }</h3>
                    <p className="text-sm text-gray-500 font-semibold">{distance + " " + "km away"}</p>
                    <p className="text-sm text-gray-700 font-semibold">&#x20b9; {services[0].price}</p>
                  </div>
                  <h4 onClick={()=> toggleFavouritesHandler(services[0]._id)} className="absolute -top-2 -left-2 text-sm text-gray-700 font-semibold">
                      {
                        user?.user.favourites.includes(services[0]._id) || isFav.includes(services[0]._id) ? (
                          <HeartIcon sx={{ color: 'red' }}/>
                        ) : (
                          <HeartOutlineIcon />
                        )
                      }
                    </h4>
                </div>
                <button onClick={()=> bookingHandler(provider, services[0].price)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded">
                    Book now  
                </button>
              </div>
            ))
          )
        }
      </div>
      <div ref={servicePanelRef} className="fixed translate-y-full h-screen w-full bottom-0 bg-white"> 
        <ServiceProviderPop setServicePanel={setServicePanel} setBookServicePanel={setBookServicePanel} />
      </div>
      <div ref={bookServicePanelRef} className="fixed translate-y-full h-screen bottom-0 z-10 w-full bg-white"> 
        <BookService setBookServicePanel={setBookServicePanel} selectedProviderId={selectedProviderId} isLoading={isLoading} user={user} selectedServicePrice={selectedServicePrice} serviceType={serviceType.slice(1)}/>
      </div>
      {
        error && <div className="text-2xl font-bold text-center mt-8">{error}</div>
      }
    </div>
  );
};

export default NearbyServiceProvider;
