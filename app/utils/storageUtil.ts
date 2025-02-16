import Cookies from "js-cookie";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const SHOP_NAME = "shopName";
const ADMIN_CODE = "adminCode";
const STATUS = "status";
const THEME_ID = "themeId";
const ACCESS_TOKEN_EXPIRES_IN = "accessTokenExpiresIn";
interface LoginInfo {
  accessToken: string;
  shopName: string;
  adminCode: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    const storage = window.localStorage;
    if (!storage) {
      return;
    }
    switch (typeof value) {
      case `string`: {
        try {
          const stringifiedValue = JSON.stringify(value);
          storage.setItem(key, stringifiedValue);
        } catch (e) {
          console.error(`failed to stringify`);
        }
        break;
      }
      default:
        storage.setItem(key, value);
    }
  }
};

export const getLocalStorage = (key: string, defaultValue = null) => {
  if (typeof window !== "undefined") {
    const storage = window.localStorage;
    if (!storage) {
      return null;
    }
    return storage.getItem(key) ?? defaultValue;
  }
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== "undefined") {
    const storage = window.localStorage;
    if (!storage) {
      return;
    }
    storage.removeItem(key);
  }
};

export const setLoginInfo = (loginInfo: LoginInfo) => {
  const {
    accessToken,
    refreshToken,
    shopName,
    adminCode,
    accessTokenExpiresIn,
  } = loginInfo;

  setLocalStorage(ACCESS_TOKEN, accessToken);
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    secure: true,
    sameSite: "Strict",
    expires: 7,
  });
  setLocalStorage(SHOP_NAME, shopName?.replaceAll(`"`, ""));
  setLocalStorage(ADMIN_CODE, adminCode?.replaceAll(`"`, ""));
  setLocalStorage(ACCESS_TOKEN_EXPIRES_IN, accessTokenExpiresIn);
};

export const setStatus = (status: string) => {
  setLocalStorage(STATUS, status);
};

export const setSelectedThemeId = (themeId: number) => {
  setLocalStorage(THEME_ID, themeId);
};

export const getLoginInfo = (): LoginInfo => {
  return {
    accessToken: getLocalStorage(ACCESS_TOKEN) || "",
    refreshToken: Cookies.get(REFRESH_TOKEN) || "",
    shopName: getLocalStorage(SHOP_NAME) || "",
    adminCode: getLocalStorage(ADMIN_CODE) || "",
    accessTokenExpiresIn: Number(getLocalStorage(ACCESS_TOKEN_EXPIRES_IN)) || 0,
  };
};
export const getStatus = () => getLocalStorage(STATUS);
export const getSelectedThemeId = () => getLocalStorage(THEME_ID);

export const removeAccessToken = () => {
  removeLocalStorageItem(ACCESS_TOKEN);
};

export const removeThemeId = () => {
  removeLocalStorageItem(THEME_ID);
};

export const removeLocalStorageAll = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    Cookies.remove(REFRESH_TOKEN);
  }
};
