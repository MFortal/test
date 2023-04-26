import Cookies from "js-cookie";
import { clearLS } from "./clearLS";
import { setAuthState } from "@/redux/slices/authSlice";

export const clearUserData = (dispatch, router) => {
  Cookies.remove("token");
  clearLS();
  dispatch(setAuthState({ token: "", info: {} }));
  router.reload(window.location.pathname);
};
