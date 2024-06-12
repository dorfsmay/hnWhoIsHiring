import axios from "axios";

const BASEURL = "https://hacker-news.firebaseio.com/v0";

export async function fetchWhoisUser() {
  return axios.get(BASEURL + "/user/whoishiring.json", {
    responseType: "json",
  });
}

export async function fetchItem(id: number) {
  return axios.get(BASEURL + `/item/${id}.json`, {
    responseType: "json",
  });
}
