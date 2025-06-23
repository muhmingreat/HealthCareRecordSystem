import { useHealthcare } from '../context/HealthCareContext';
import SidebarMobile from './Sidebar';
import { Link } from 'react-router-dom';

const Header = () => {
const { appName } = useHealthcare();
  return (
    <header>
      <div className="bg-green-400 flex justify-between items-center
       text-white p-4 fixed  w-full z-10  ">
        
          <h1 className="text-4xl font-extrabold 
           bg-[linear-gradient(to_right,#004225,#8B0000,#000000,#FFD700,#000000)] 
           bg-clip-text text-transparent 
           bg-[length:300%_100%]"
     style={{animation: "shimmer 5s linear infinite"}}>
  {appName}
</h1>

        <nav>
          {/* Hide on screens smaller than lg */}
          <ul className="hidden lg:flex space-x-4 items-center cursor-pointer">
            <li><Link to="/" className="hover:text-green-900 hover:underline">Home</Link></li>
            <li><Link to="/patient" className="hover:text-green-900 hover:underline"> Register</Link></li>
            <li><Link to="/doctor" className="hover:text-green-900 hover:underline">Register as Doctor</Link></li>
         <li> 
          <appkit-button/>
         
    </li>
      </ul>
        </nav>
      </div>
      
      {/* <SidebarMobile/> */}
    </header>
  );
};

export default Header;
