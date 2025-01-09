import { useState } from 'react';
import Box from '@mui/material/Box';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ServiceIcon from '@mui/icons-material/HomeRepairService';
import RecentIcon from '@mui/icons-material/Restore';
import ProfileIcon from '@mui/icons-material/ManageAccounts';

export default function ProviderNavigation({setAddServicePanel, addServicePanel, value, setValue}) {

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Dashboard" icon={<DashboardIcon/>}/>
        <BottomNavigationAction label="Add Service" icon={<ServiceIcon />} onClick={() => {setAddServicePanel(!addServicePanel); addServicePanel && setValue(0)}}/>
        <BottomNavigationAction label="Recent" icon={<RecentIcon />} />
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
      </BottomNavigation>
    </Box>
  );
}
