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

const setStorage = (storage: Storage, key: string, value: any) => {
  if (typeof window !== "undefined") {
    if (!storage) return;
    switch (typeof value) {
      case `string`:
        try {
          const stringifiedValue = JSON.stringify(value);
          storage.setItem(key, stringifiedValue);
        } catch (e) {
          console.error(`Failed to stringify value for key: ${key}`);
        }
        break;
      default:
        storage.setItem(key, value);
    }
  }
};

const getStorage = (storage: Storage, key: string, defaultValue = null) => {
  if (typeof window !== "undefined") {
    if (!storage) return null;
    return storage.getItem(key) ?? defaultValue;
  }
  return null;
};

const removeStorageItem = (storage: Storage, key: string) => {
  if (typeof window !== "undefined") {
    if (!storage) return;
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

  const sessionStorage = window.sessionStorage;
  setStorage(sessionStorage, ACCESS_TOKEN, accessToken);
  setStorage(sessionStorage, REFRESH_TOKEN, refreshToken);
  setStorage(sessionStorage, SHOP_NAME, shopName);
  setStorage(sessionStorage, ADMIN_CODE, adminCode);
  setStorage(sessionStorage, ACCESS_TOKEN_EXPIRES_IN, accessTokenExpiresIn);
};

export const getLoginInfo = (): LoginInfo => {
  const sessionStorage = window.sessionStorage;
  return {
    accessToken: getStorage(sessionStorage, ACCESS_TOKEN) || "",
    refreshToken: getStorage(sessionStorage, REFRESH_TOKEN) || "",
    shopName: getStorage(sessionStorage, SHOP_NAME) || "",
    adminCode: getStorage(sessionStorage, ADMIN_CODE) || "",
    accessTokenExpiresIn:
      Number(getStorage(sessionStorage, ACCESS_TOKEN_EXPIRES_IN)) || 0,
  };
};

export const removeLoginInfo = () => {
  const sessionStorage = window.sessionStorage;
  removeStorageItem(sessionStorage, ACCESS_TOKEN);
  removeStorageItem(sessionStorage, REFRESH_TOKEN);
  removeStorageItem(sessionStorage, SHOP_NAME);
  removeStorageItem(sessionStorage, ADMIN_CODE);
  removeStorageItem(sessionStorage, ACCESS_TOKEN_EXPIRES_IN);
};

export const setStatus = (status: string) => {
  setStorage(window.localStorage, STATUS, status);
};

export const setSelectedThemeId = (themeId: number) => {
  setStorage(window.localStorage, THEME_ID, themeId);
};

export const getStatus = () => getStorage(window.localStorage, STATUS);

export const getSelectedThemeId = () =>
  getStorage(window.localStorage, THEME_ID);

export const removeAccessToken = () => {
  removeStorageItem(window.sessionStorage, ACCESS_TOKEN);
};

export const removeThemeId = () => {
  removeStorageItem(window.localStorage, THEME_ID);
};

export const removeLocalStorageAll = () => {
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
};
