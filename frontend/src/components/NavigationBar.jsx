import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const isActivePath = (path) => location.pathname === path;
    return (
        <footer className="w-full fixed bottom-0 border-t border-solid border-gray-200 md:hidden">
            <div className="flex items-center justify-evenly w-full gap-2 pt-4 px-2 bg-slate-50">
                <NavLink
                    to="/user/home"
                    className={({ isActive }) =>
                        `flex flex-col gap-1 items-center ${
                            isActive ? "text-[#1a80e6]" : "text-[#4e7397]"
                        }`
                    }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256">
                        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                    </svg>
                    <span className="text-xs font-medium leading-normal tracking-[0.015em]">
                        Home
                    </span>
                </NavLink>
                <NavLink
                    to="/user/all-bookings"
                    className={`flex flex-col gap-1 items-center ${ isActivePath('/user/all-bookings') ? "text-[#1a80e6]" : "text-[#4e7397]" }`
                    }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256">
                        <path d="M200,32H56A24,24,0,0,0,32,56V200a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24V56A24,24,0,0,0,200,32ZM128,160a8,8,0,0,1-11.31,0l-32-32a8,8,0,0,1,11.31-11.31L128,139.69l28.62-28.62a8,8,0,0,1,11.31,11.31ZM128,96a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48a8,8,0,0,1,8,8Zm56,32a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h112a8,8,0,0,1,8,8Z"></path>
                    </svg>

                    <span className="text-xs font-medium leading-normal tracking-[0.015em]">
                        All Bookings
                    </span>
                </NavLink>
                <NavLink
                    to="/user/message"
                    className={({ isActive }) =>
                        `flex flex-col gap-1 items-center ${
                            isActive ? "text-[#1a80e6]" : "text-[#4e7397]"
                        }`
                    }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256">
                        <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
                    </svg>
                    <span className="text-xs font-medium leading-normal tracking-[0.015em]">
                        Messages
                    </span>
                </NavLink>
                <NavLink
                    to="/user/profile"
                    className={({ isActive }) =>
                        `flex flex-col gap-1 items-center ${
                            isActive ? "text-[#1a80e6]" : "text-[#4e7397]"
                        }`
                    }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                    </svg>
                    <span className="text-xs font-medium leading-normal tracking-[0.015em]">
                        Profile
                    </span>
                </NavLink>
            </div>
            <div className="h-5 bg-slate-50"></div>
        </footer>
    );
};

export default NavigationBar;
