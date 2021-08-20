import React from "react";
import { DeviceData } from "../model";
interface DeviceListProps {
  devices: DeviceData[];
}

const DeviceList = ({ devices }: DeviceListProps) => {
  return (
    <>
      {devices.map((device) => (
        <div key={device.id}>{device.name}</div>
      ))}
    </>
  );
};

export default DeviceList;
