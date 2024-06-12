import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { fetchWhoisUser, fetchItem } from "./fetch";
import * as t from "./types";

const TRIES = 10;

export async function getStoryAsync() {
  let isError = false;
  let isPending = true;
  let error = null;
  let data = null;
  let submitted: number[] = [];

  const setError = (err: t.RequestError) => {
    error = err;
    isError = true;
    isPending = false;
  };

  await fetchWhoisUser()
    .then((response) => {
      const axiosResponse = response as AxiosResponse;
      if (axiosResponse?.data?.submitted) {
        submitted = axiosResponse?.data?.submitted;
      } else {
        setError({ message: "No submission found." });
      }
    })
    .catch((err) => {
      setError(err as t.RequestError);
    });

  if (!isError) {
    let loop = 0;
    while (
      loop < TRIES &&
      loop < submitted.length &&
      data === null &&
      error === null
    ) {
      const itemId = submitted[loop];
      await fetchItem(itemId)
        .then((response) => {
          const axiosResponse = response as AxiosResponse;
          if (
            axiosResponse?.data?.title &&
            axiosResponse.data.title.match(/Who is hiring?/)
          ) {
            data = axiosResponse.data as t.HnItem;
            isPending = false;
          }
        })
        .catch((err) => {
          setError(err as t.RequestError);
        });

      loop++;
    }
  }
  if (!isError && data === null)
    setError({ message: "Could not find a 'Who is hiring?' submisison." });

  return { data, error, isPending, isError };
}

export function useGetStory() {
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    getStoryAsync().then((state) => {
      setIsError(state.isError);
      setIsPending(state.isPending);
      setError(state.error);
      setData(state.data);
    });
  }, []);

  return { data, error, isPending, isError };
}
