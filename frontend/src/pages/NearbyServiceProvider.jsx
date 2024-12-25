import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ServiceProviderPop from "../components/ServiceProviderPop";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import BookService from "../components/BookService";

const NearbyServiceProvider = () => {
    const [servicePanel, setServicePanel] = useState(false);
    const [bookServicePanel, setBookServicePanel] = useState(false);

    const servicePanelRef = useRef(null)
    const bookServicePanelRef = useRef(null)
    const navigate = useNavigate();
        
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

  const providers = [
    {
      name: "Gardening",
      distance: "2 miles away",
      profilePicture: "/profile1.webp",
    },
    {
      name: "Massage",
      distance: "3 miles away",
      profilePicture: "/profile2.webp",
    },
  ];

  return (
    <div className="bg-gray-100 h-screen flex flex-col pt-4 relative">
        <div className="wf-full flex items-center justify-between px-4">
        <i onClick={()=> navigate(-1)} className="text-2xl ri-arrow-left-line"></i>
        <h1 className="text-2xl font-bold text-center w-full">Services</h1>
        </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Nearby service providers</h2>
        {providers.map((provider, index) => (
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
                <h3 className="font-bold">{provider.name}</h3>
                <p className="text-sm text-gray-500">{provider.distance}</p>
              </div>
            </div>
            <button onClick={()=> setServicePanel(true)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded">
                Book now  
            </button>
          </div>
        ))}
      </div>
      <div ref={servicePanelRef} className="fixed translate-y-full h-screen w-full bottom-0 bg-white"> 
        <ServiceProviderPop setServicePanel={setServicePanel} setBookServicePanel={setBookServicePanel} />
      </div>
      <div ref={bookServicePanelRef} className="fixed translate-y-full bottom-0 z-10 w-full bg-white"> 
        <BookService setBookServicePanel={setBookServicePanel}/>
      </div>
    </div>
  );
};

export default NearbyServiceProvider;
