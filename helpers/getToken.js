import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token");
};

export const getAuthorization = () => {
  return { Authorization: `Bearer ${getToken()}` };
};
