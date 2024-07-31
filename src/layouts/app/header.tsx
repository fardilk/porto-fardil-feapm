import { useEffect, useState } from "react";

import { Box, MenuItem, Select, Switch, Typography, useTheme } from "@mui/material";

import { Header_Height } from "src/utils/variables";

import { Image } from "src/components/image";
import { RHFSelect, RHFSwitch } from "src/components/hook-form";
import { Iconify } from "src/components/iconify";
import { useTranslate } from "src/locales";
import { CONFIG } from "src/config-global";

const Header = () => {

  /* Function */
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.toLocaleString('id-ID', { day: '2-digit' });
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.toLocaleString('id-ID', { year: 'numeric' });
    return `${day} ${month.toUpperCase()} ${year}`;
  };

  const { onChangeLang, currentLang } = useTranslate()

  const theme = useTheme()

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

  console.log(currentLang.value)
  const PlatformName = "Anjungan " + CONFIG.app.platformName
  const HospitalName = "RS " + CONFIG.app.hospitalName


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
        <Typography variant="h6" color={'grey'}>{PlatformName.toUpperCase()}</Typography>
        <Typography variant="h6" color={'secondary.darker'} noWrap textOverflow="ellipsis">{HospitalName.toUpperCase()}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          placeItems: "center",
          width: "fit-content",
          pl: 2,
          pr: 2,
          borderRadius: 1,
          bgcolor: theme.palette.secondary.light,
        }}
      >
        <Iconify icon="flagpack:id" />
        <Switch
          checked={currentLang.value === "en"}
          onChange={(event) => {
            if(event.target.checked){
              onChangeLang("en")
            } else {
              onChangeLang("id")
            }
          }}
        />
        <Iconify icon="flagpack:gb-ukm"/>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', width: 120 }}>
        <Typography variant="body2">{getCurrentDate()}</Typography>
        <Typography variant="h3">{time}</Typography>
      </Box>
    </Box>
  )
}

export default Header
