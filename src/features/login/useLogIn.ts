import { LogInEmailPassword } from "./model";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkAuth, selectLogInStatus } from "./logInSlice";
const useLogIn = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLogInStatus);

  const onFinish = (EmailPwd: LogInEmailPassword) => {
    dispatch(checkAuth(EmailPwd));
  };

  return {
    isLoading,
    onFinish,
  };
};
export default useLogIn;
