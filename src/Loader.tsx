import Page from "./Page";
import { useGetStory } from "./whoisStroy";
import { useGetPosts } from "./posts";

export default function Loader() {
  const storyRequest = useGetStory();

  const postsData = useGetPosts(storyRequest.data);

  return <Page {...{ storyRequest, postsData }} />;
}
