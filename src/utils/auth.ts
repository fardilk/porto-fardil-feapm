import JSEncrypt from 'jsencrypt';
import { jwtDecode } from 'jwt-decode';
import axios from './axios';

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string | null) => {
  if (accessToken == null) return false;
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const setSession = (
  accessToken: string | null,
  userID?: string | null,
  expired?: string | null
) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    if (userID) {
      localStorage.setItem('userID', userID);
    }
    if (expired) {
      localStorage.setItem('expired', expired);
    }
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('expired');
    localStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  }
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export const GetAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};

const hisPublicKey = import.meta.env.VITE_APP_PUBLIC_KEY || '';

export const hisPublicEncrypt: (data: string) => { status: boolean; encrypted: string } = (
  data
) => {
  const crypt = new JSEncrypt();
  crypt.setPublicKey(hisPublicKey);
  const enc_data = crypt.encrypt(data);
  if (enc_data === false) {
    return { status: false, encrypted: data };
  }
  return { status: true, encrypted: enc_data };
};
