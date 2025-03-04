import React from 'react';
import { Link } from 'react-router-dom';

const HowServiceHubWork = ({path}) => {
    const redirectTo = path.split('/')[1]

  return (
    <div className='w-full min-h-screen bg-gray-100 flex justify-center items-center p-6'>
      <div className='max-w-3xl bg-white shadow-lg rounded-lg p-8'>
        <h2 className='text-3xl font-bold text-gray-800 text-center mb-6'>How Service Hub Works</h2>

        <div className='space-y-4 text-gray-700'>
          <p>
            <strong>1. Create a User Account:</strong> Customers need to sign up and add their address to start booking services.
          </p>
          <p>
            <strong>2. Register as a Service Provider:</strong> Service providers can create an account with their nearby address (within 10km) and list services such as electricians, plumbers, and more.
          </p>
          <p>
            <strong>3. Find Services on the Homepage:</strong> Customers will see available services listed on their homepage based on their location.
          </p>
          <p>
            <strong>4. Book a Service:</strong> When a customer clicks the "Book Now" button, they will see nearby providers within 10km. If a provider is available, they can proceed with the booking.
          </p>
          <p>
            <strong>5. Service Confirmation:</strong> The provider will receive the request and confirm the service booking.
          </p>
        </div>

        <div className='text-center mt-6'>
          <Link to={`/${redirectTo}/home`} className='bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HowServiceHubWork;
