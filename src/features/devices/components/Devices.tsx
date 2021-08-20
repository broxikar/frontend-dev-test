import { Button, Divider, Row, Spin } from "antd";
import MemoizedNotify from "./Notify";
import DeviceList from "./DeviceList";
import useDevice from "../useDevice";

const Devices = () => {
  const { devices, isLoading, handleClickNotify, notifyModal, onLogOut } =
    useDevice();

  return (
    <>
      <DeviceList devices={devices} />
      <Divider />
      {isLoading ? <Spin /> : devices.length}
      <br />
      <>devices</>
      <Row>
        <Button type="primary" onClick={handleClickNotify}>
          Notify
        </Button>
        <Button onClick={onLogOut}>Log Out</Button>
      </Row>
      <MemoizedNotify
        showNotify={notifyModal}
        closeNotify={handleClickNotify}
      />
    </>
  );
};
export default Devices;
