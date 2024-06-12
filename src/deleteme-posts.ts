import axios, { AxiosResponse } from "axios";
import { HnItem } from "./types";


async function postsParser(data: number[]) {
  let loops = 0;
  let stories = [];

    const begining = loops * NUMBER_OF_ITEMS;
    const storiesIds = data.slice(begining, begining + NUMBER_OF_ITEMS);

    const promises = storiesIds.map((id: number) =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`),
    );

    const results = await Promise.allSettled(promises);

    const fulFilled = results.filter(
      (promise) => promise.status === "fulfilled",
    ) as PromiseFulfilledResult<AxiosResponse>[];

    stories = fulFilled
      .map((promise) => promise.value.data)
      .filter((data: HnItem) => data.title?.match(/Who is hiring?/));
    loops++;

  const success = stories.length >= 1;
  return { success, data: stories };
}

export default postsParser;
