import { NotifyType } from "./model";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { submitNotify } from "./deviceSlice";
import { selectAuthToken } from "../login/logInSlice";

const useNotify = (closeNotify: (close: boolean) => void) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);
  const onFinish = (values: NotifyType) => {
    if (!token) {
      return;
    }
    const notifyForm = {
      token: token,
      notify: values,
    };
    dispatch(submitNotify(notifyForm));
    onCancel();
  };
  const onCancel = () => {
    closeNotify(false);
  };

  return {
    onFinish,
    onCancel,
  };
};

export default useNotify;
