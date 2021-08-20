export interface DeviceData {
  id: number;
  name: string;
}

export interface NotifyType {
  name: string;
  email: string;
  repoUrl: string;
  message: string;
}

export interface NotifyForm {
  notify: NotifyType;
  token: string;
}
