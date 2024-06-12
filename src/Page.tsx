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
        return <div>Loading posts...</div>;
      } else console.log(postsData.posts[0].text);
      return (
        <>
          <div>
            <table>
              <tbody>
                {postsData?.posts &&
                  postsData.posts.map((post) => (
                    <tr key={post.id}>
                      <td>{new Date(post.time * 1000).toISOString()}</td>
                      <td>
                        <a
                          href={`https://news.ycombinator.com/item?id=${post.id}`}
                        >
                          {post.id}
                        </a>
                      </td>
                      <td>{post.text}</td>
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
