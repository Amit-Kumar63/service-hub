import { useEffect } from "react";
export function SetTitle({path}) {
    useEffect(() => {
        let title = 'ServiceHub';
        switch (path) {
            case '/user/home':
                title = 'Home';
                break;
            case '/user/profile':
                title = 'Profile';
                break;
            case '/user/login':
                console.log('login')
                title = 'Login';
                break;
            case '/user/signup':
                title = 'Signup';
                break;
            case '/user/service-provider':
                title = 'Nearby Service Providers';
                break;
            case '/user/booking-finished':
                title = 'Finished Booking';
                break;
            case '/user/user-booking-summary':
                title = 'Booking Summary';
                break;
            case '/user/message':
                title = 'Message';
                break;
            case '/user/all-bookings':
                title = 'All Bookings';
            default:
                title = `${title} | ServiceHub`;
                break;
        }
        document.title = `${title} | ServiceHub`;
    }, [path]);

    return null
}