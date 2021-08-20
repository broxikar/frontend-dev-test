import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logOut } from "../login/logInSlice";
import {
  fetchDevices,
  selectDevices,
  selectFetchDeviceStatus,
} from "./deviceSlice";

const useDevice = () => {
  const dispatch = useAppDispatch();
  const devices = useAppSelector(selectDevices);
  const isLoading = useAppSelector(selectFetchDeviceStatus);
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchDevices());
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickNotify = () => {
    setShowNotify(!showNotify);
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return {
    devices,
    isLoading,
    handleClickNotify,
    onLogOut,
    showNotify,
  };
};

export default useDevice;
