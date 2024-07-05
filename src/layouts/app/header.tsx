import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { Header_Height } from "src/utils/variables";

import { Image } from "src/components/image";

const Header = () => {

  /* Function */
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.toLocaleString('id-ID', { day: '2-digit' });
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.toLocaleString('id-ID', { year: 'numeric' });
    return `${day} ${month.toUpperCase()} ${year}`;
  };

  /* State */
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);


  return (
    <Box sx={{
      height: Header_Height,
      p: 4,
      bgcolor: "white",
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    }}>
      <Image src="/logo/logo.png" alt="logo_rs" />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{import.meta.env.VITE_APP_NAME}</Typography>
        <Typography variant="body2" noWrap textOverflow="ellipsis">{import.meta.env.VITE_APP_ADDRESS} Telp: {import.meta.env.VITE_APP_TELECOM}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: 'fit-content' }}>
        <Typography variant="body2">{getCurrentDate()}</Typography>
        <Typography variant="h3">{time}</Typography>
      </Box>
    </Box>
  )
}

export default Header