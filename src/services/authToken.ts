const tokenName = "front-end-test-token";

const getAuthToken = () => {
  let isLoggedIn = false;
  const token = localStorage.getItem(tokenName);
  if (token) {
    isLoggedIn = true;
  }
  return { isLoggedIn, token };
};

const setAuthToken = (token: string) => {
  console.log("set token", token);
  localStorage.setItem(tokenName, token);
};

const removeAuthToken = () => {
  localStorage.removeItem(tokenName);
};

export { getAuthToken, setAuthToken, removeAuthToken };
