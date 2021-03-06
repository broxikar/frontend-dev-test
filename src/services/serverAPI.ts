import { notification } from "antd";
import axios from "axios";
import { NotifyForm } from "../features/devices/model";
import { LogInEmailPassword } from "../features/login/model";
import * as API from "./endPoints";

const serverApi = {
  get: () => {
    return deviceAPI();
  },
  post: (notifyForm: NotifyForm) => {
    return notifyAPI(notifyForm);
  },
  logIn: (userAuth: LogInEmailPassword) => {
    return authAPI(userAuth);
  },
};

const deviceAPI = async () => {
  try {
    const res = await axios.get(`${API.API}${API.END_POINT_DEVICES}`);
    const { data } = res;
    if (data) {
      return data;
    }
    return undefined;
  } catch (err) {
    notification.open({ message: `${API.END_POINT_DEVICES}: ${err}` });
  }
};

const notifyAPI = async (notifyForm: NotifyForm) => {
  const { token, notify } = notifyForm;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const res = await axios.post(
      `${API.API}${API.END_POINT_NOTIFY}`,
      notify,
      config
    );
    if (res) {
      notification.open({ message: `Nofity submitted` });
    }
  } catch (err) {
    notification.open({ message: `${API.END_POINT_NOTIFY}: ${err}` });
  }
};

const authAPI = async (userAuth: LogInEmailPassword) => {
  try {
    const res = await axios.post(`${API.API}${API.END_POINT_LOGIN}`, userAuth);
    if (res.status === 200) {
      const token = res.data;
      const isLoggedIn = true;
      return { token, isLoggedIn };
    }
    return undefined;
  } catch (error) {
    notification.open({
      message: `${API.END_POINT_LOGIN}: Invalid email and password combination.  ${error}`,
    });
  }
};

export default serverApi;
