import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServiceProviderPop from "../components/ServiceProviderPop";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import BookService from "../components/BookService";
import { useGetNearbyProvidersQuery, useGetUserQuery } from "../app/api/api";
import GetLocation from "../components/GetLocation";
import { CircularProgress } from '@mui/material';

const NearbyServiceProvider = () => {
    const [servicePanel, setServicePanel] = useState(false);
    const [bookServicePanel, setBookServicePanel] = useState(false);
    const [location, setLocation] = useState(null);
    const [useCurrentLocationToFetch, setUseCurrentLocationToFetch] = useState(false)

    const servicePanelRef = useRef()
    const bookServicePanelRef = useRef()
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { data: user, isLoading: userLoading } = useGetUserQuery(undefined, {
        skip: !token
    });

    // console.log(location)
    const { lat, lng } = useCurrentLocationToFetch ? user?.user.location : location || {};
        
    const { isLoading, data, isError, isSuccess } = useGetNearbyProvidersQuery({ lat, lng }, {
        skip: !user
    });

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

  if (userLoading) {
    return <div>Loading... Please wait</div>
  }

  if (!data) {
    return <div className="text-2xl font-bold text-center mt-8">No service providers found</div>
  }  
  return (
    <div className="bg-gray-100 h-screen flex flex-col pt-4 relative">
        <div className="wf-full flex items-center justify-between px-4">
        <i onClick={()=> navigate(-1)} className="text-2xl ri-arrow-left-line"></i>
        <h1 className="text-2xl font-bold text-center w-full">Services</h1>
        </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Nearby service providers</h2>
        <button onClick={(e) => e.target.firstChild.data === 'Use current location' ? setUseCurrentLocationToFetch(true) : setUseCurrentLocationToFetch(false)} 
        className={`w-full font-semibold py-3 text-nowrap mb-4 rounded ${useCurrentLocationToFetch ? 'bg-slate-700' : 'bg-gray-600'} text-white `}>{!useCurrentLocationToFetch ? 'Use current location' : 'Use saved location'}</button>
        {
          isLoading ? 
            (<div className="w-full flex items-center justify-center mt-10"><CircularProgress /></div>) : 
            (data?.nearbyProviders.map((provider, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4"
              >
                <div className="flex items-center">
                  <img
                    src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg'
                    alt={provider.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{provider.firstName.charAt(0).toUpperCase() + provider.firstName.slice(1) + ' ' + provider.lastName.charAt(0).toUpperCase() + provider.lastName.slice(1) }</h3>
                    <p className="text-sm text-gray-500 font-semibold">{provider.distance + " " + "km away"}</p>
                  </div>
                </div>
                <button onClick={()=> setBookServicePanel(true)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded">
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
        <BookService setBookServicePanel={setBookServicePanel}/>
      </div>
      <GetLocation getCurrentPosition={!useCurrentLocationToFetch} location={location} setLocation={setLocation}/>
    </div>
  );
};

export default NearbyServiceProvider;
