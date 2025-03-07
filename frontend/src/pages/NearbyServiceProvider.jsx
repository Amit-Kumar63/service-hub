import React, { useEffect, useRef } from "react";
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
import {toast} from 'react-toastify'

const NearbyServiceProvider = () => {
  const { user, token, refetch } = useOutletContext()
    const [servicePanel, setServicePanel] = useState(false);
    const [bookServicePanel, setBookServicePanel] = useState(false);
    const [selectedProviderId, setSelectedProviderId] = useState('')
    const [selectedServicePrice, setSelectedServicePrice] = useState(0)
    const [isFav, setIsFav] = useState([])

    const servicePanelRef = useRef()
    const bookServicePanelRef = useRef()
  
    const { serviceType  } = useParams()    

    const { lat, lng } = user?.user.location || {}
        
    const { isLoading, data, error: isError, isFetching } = useGetNearbyProvidersQuery({ lat, lng, serviceType: serviceType.slice(1)}, {
        skip: !token
    });

    const [addToFav, { isLoading: addToFavLoading, isSuccess: addToFavSuccess, error: addToFavError }] = useGetAddToFavMutation()

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

  const bookingHandler = (provider, price)=> {
    setBookServicePanel(true);
    setSelectedProviderId(provider._id)
    setSelectedServicePrice(price)
  }

  const addToFavouritesHandler = async (serviceId)=> {
   try {
     await addToFav({serviceId, token})
     await refetch()
     return
   } catch (error) {
    toast.error(error.response?.data.message || 'Something went wrong, please try again')
   }
  }

  const toggleFavouritesHandler = (serviceId)=> {
    setIsFav((previousValue) => {
      const newFav = previousValue.includes(serviceId) ?
        previousValue.filter((id) => id.toString() !== serviceId.toString()) :
        [...previousValue, serviceId]
      return newFav
    }
    );
    addToFavouritesHandler(serviceId)
  }

  useEffect(()=> {
    if (!data) {
      <div>No service providers found nearby from your current location. Please use saved location</div>
    }
    if (isError) {
      toast.error(isError?.data?.message || "Something went wrong, please try again")
  }
  }, [data, isError])
  
  useEffect(() => {
    if ( addToFavLoading ) {
      <CircularProgress sx={{marginLeft: 'auto', marginRight: 'auto'}}/>
    }
    if (addToFavError) {
      toast.error(error?.data?.message || "Something went wrong, while adding to favourites")
    }
  }, [addToFavLoading, addToFavSuccess, addToFavError])
  return (
    <div className="bg-gray-100 h-screen flex flex-col pt-4 relative">
        <div className="w-full flex items-center justify-between px-4">
        <i onClick={()=> window.history.back()} className="text-2xl ri-arrow-left-line"></i>
        <h1 className="text-2xl font-bold text-center w-full">Services</h1>
        </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Nearby service providers</h2>       
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
                          <HeartIcon sx={{ color: 'red'}}/>
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
        <BookService setBookServicePanel={setBookServicePanel} selectedProviderId={selectedProviderId} selectedServicePrice={selectedServicePrice} serviceType={serviceType.slice(1)}/>
      </div>
    </div>
  );
};

export default NearbyServiceProvider;
