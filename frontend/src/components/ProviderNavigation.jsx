import Box from '@mui/material/Box';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ServiceIcon from '@mui/icons-material/HomeRepairService';
import RecentIcon from '@mui/icons-material/Restore';
import ProfileIcon from '@mui/icons-material/ManageAccounts';


export default function ProviderNavigation({setAddServicePanel, addServicePanel, value, setValue, recentBookingsPanel, setRecentBookingsPanel}) {

  const dashboardIconHandler = ()=> {
    setRecentBookingsPanel(false)
    setAddServicePanel(false)
  }
  const serviceIconHandler = ()=> {
    setAddServicePanel(!addServicePanel);
    addServicePanel && setValue(0)
    setRecentBookingsPanel(false)
  }
  const recentIconHandler = ()=> {
    setRecentBookingsPanel(!recentBookingsPanel); 
    recentBookingsPanel && setValue(0)
    setAddServicePanel(false)
  }
  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon/>} onClick={ dashboardIconHandler }/>
        <BottomNavigationAction label="Add Service" icon={<ServiceIcon />} onClick={ serviceIconHandler }/>
        <BottomNavigationAction label="Recent" icon={<RecentIcon />} onClick={ recentIconHandler }/>
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
      </BottomNavigation>
    </Box>
  );
}
