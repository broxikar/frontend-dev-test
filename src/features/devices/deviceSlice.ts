import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import serverApi from "../../services/serverAPI";
import { DeviceData, NotifyForm } from "./model";

interface DeviceSlice {
  devices: DeviceData[];
  status: "idle" | "loading" | "success";
}

const initialState: DeviceSlice = {
  status: "idle",
  devices: [
    {
      id: 0,
      name: "test",
    },
  ],
};

export const fetchDevice = createAsyncThunk("device/fetchDevices", async () => {
  const response = await serverApi.get();
  return response;
});

export const submitNotify = createAsyncThunk(
  "device/sendNotify",
  async (notify: NotifyForm) => {
    const response = await serverApi.post(notify);
    return response;
  }
);

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDevice.fulfilled, (state, action) => {
        const response = action.payload;
        if (!response) {
          return;
        }
        state.devices = response.devices;
        state.status = "idle";
      });
  },
});

export const fetchDevices = (): AppThunk => (dispatch) => {
  dispatch(fetchDevice());
};

export const selectDevices = (state: RootState) => state.device.devices;
export const selectFetchDeviceStatus = (state: RootState) =>
  state.device.status === "loading";

export default deviceSlice.reducer;
