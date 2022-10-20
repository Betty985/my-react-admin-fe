import localforage from "localforage";

export async function getLoginInfo(query) {
  await fakeNetwork(`getLoginInfo:${query}`);
  let loginInfo = await localforage.getItem("login");
  if (!loginInfo) loginInfo = {};
  return loginInfo;
}
export async function setLoginInfo(loginInfo) {
  return localforage.setItem("login", loginInfo);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}