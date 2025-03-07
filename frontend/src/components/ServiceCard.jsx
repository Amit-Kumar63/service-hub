import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
  return (
    <div className="">
      <div
        className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url(${service?.image})`,
        }}
      >
        <div className="flex w-full items-end justify-between gap-4 p-4">
          <p className="text-white tracking-light text-2xl font-bold leading-tight flex-1">{service?.serviceType?.charAt(0).toUpperCase() + service?.serviceType.slice(1)}</p>
          <Link to={`/user/service-provider/:${service?.serviceType}`}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Book now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;