import axios, { AxiosError } from "axios";
import getWhoisStories from "./stories";

export async function getStories() {
  let success = false;
  let data = null;
  let error = null;

  let response;
  try {
    response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/user/whoishiring.json",
    );
  } catch (e) {
    const axiosError = e as AxiosError;
    error = {
      message: axiosError.message,
      name: axiosError.name,
      code: axiosError.code,
    };
  }

  let whoIsStories = null;
  if (response) {
    whoIsStories = await getWhoisStories(response.data.submitted);
    console.log("parsed:", whoIsStories);
    success = whoIsStories.success;
    if (success) data = whoIsStories.data;
  }

  return { success, data, error };
}

export async function getAllPosts(stories: number[]) {
    console.log(stories)
}
