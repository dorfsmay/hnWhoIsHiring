//import { useState, useEffect } from "react";
import * as t from "./types";
import "./App.css";

type Props = {
  storyRequest: t.Request<t.HnItem>;
  postsData: {
    posts: t.post[];
    successfull: number;
    failed: number;
  };
};

const url = (id: number) => `https://news.ycombinator.com/item?id=${id}`;

const showStoryDetails = (post: t.HnItem | null) => {
  if (post?.time !== undefined) {
    const postDate = new Date(post.time * 1000);
    const year = postDate.getFullYear();
    const month = postDate.toLocaleString("default", { month: "long" });
    console.log(post);
    return (
      <div>
        Latest HN who's hiring from
        <a href={url(post.id)}>
          <strong>
            {month} {year}
          </strong>
        </a>
      </div>
    );
  } else return null;
};

export default function Page({ storyRequest, postsData }: Props) {
  if (storyRequest.isPending) {
    return <div>Loading latest "Who is hiring?" story</div>;
  } else {
    if (storyRequest?.isError) {
      return (
        <>
          <div>Error while trying to retrieve "Who is hiring?" story</div>
          {storyRequest.error !== null && (
            <>
              <div>{storyRequest.error.message}</div>
            </>
          )}
        </>
      );
    } else {
      if (postsData?.posts && postsData.posts.length === 0) {
        return;
        <div>
          {showStoryDetails(storyRequest.data)}
          <div>Loading posts...</div>;
        </div>;
      }
      return (
        <>
          <div>
            {showStoryDetails(storyRequest.data)}
            <table>
              <tbody>
                {postsData?.posts &&
                  postsData.posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div>
                          <a href={url(post.id)}>
                            {post.id} by {post.by}
                          </a>
                        </div>
                        <div>{new Date(post.time * 1000).toISOString()}</div>
                      </td>
                      <td>{post.header}</td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{ __html: post.details[0] }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }
}
