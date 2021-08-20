import { Button, Divider, Row, Spin } from "antd";
import Notify from "./Notify";
import DeviceList from "./DeviceList";
import useDevice from "../useDevice";

const Devices = () => {
  const { devices, isLoading, handleClickNotify, showNotify, onLogOut } =
    useDevice();

  return isLoading ? (
    <Spin />
  ) : (
    <>
      <DeviceList devices={devices} />
      <Divider />
      {devices.length}
      <br />
      <>devices</>
      <Row>
        <Button type="primary" onClick={handleClickNotify}>
          Notify
        </Button>
        <Button onClick={onLogOut}>Log Out</Button>
      </Row>
      <Notify showNotify={showNotify} closeNotify={handleClickNotify} />
    </>
  );
};
export default Devices;
