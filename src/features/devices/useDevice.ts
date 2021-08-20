import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logOut } from "../login/logInSlice";
import {
  fetchDevices,
  selectDevices,
  selectFetchDeviceStatus,
  selectNotifyModal,
  showModal,
} from "./deviceSlice";

const useDevice = () => {
  const dispatch = useAppDispatch();
  const devices = useAppSelector(selectDevices);
  const notifyModal = useAppSelector(selectNotifyModal);
  const isLoading = useAppSelector(selectFetchDeviceStatus);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchDevices());
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickNotify = () => {
    dispatch(showModal());
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return {
    devices,
    isLoading,
    handleClickNotify,
    onLogOut,
    notifyModal,
  };
};

export default useDevice;
