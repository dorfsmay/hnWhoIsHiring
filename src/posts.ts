import { useQueries } from "@tanstack/react-query";
import * as t from "./types";
import { fetchItem } from "./fetch";

export function useGetPosts(story: t.HnItem | null) {
  const kids = story?.kids ? story?.kids.slice(0, 4) : [];

  const commentsRequest = useQueries({
    queries: kids.map((itemId) => ({
      queryKey: [itemId],
      queryFn: () => fetchItem(itemId),
      staleTime: Infinity,
      enable: story !== null && kids.length > 0,
    })),
  });

  const posts: t.post[] = [];
  const successfull: number[] = [];
  const failed: number[] = [];
  commentsRequest.map((comment) => {
    if (comment?.data?.data?.id) {
      const p = comment.data.data;
      if (p.text) {
        posts.push({
          id: p.id,
          by: p.by,
          time: p.time,
          text: p.text,
        });
        successfull.push(comment.data.data.id);
      } else failed.push(p.id);
    }
  });

  return { posts, successfull: successfull.length, failed: failed.length };
}
