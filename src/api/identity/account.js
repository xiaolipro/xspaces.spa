import request from "@/utils/axios";

export function login(data) {
  return request({
    url: "/identity/account/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "/identity/account/logout",
    method: "post",
  });
}

export function register(data) {
  return request({
    url: "/identity/account/register",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/identity/account/info",
    method: "get",
    params: { token },
  });
}
