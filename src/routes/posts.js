// react
import { useState, useEffect } from 'react';

const Posts = (props) => {
  // props
  const { getPosts } = props;

  // state
  const [posts, setPosts] = useState([]);

  // get posts on load
  useEffect(
    () => {
      setPosts(getPosts());
      // TODO: Fix this! getPosts() is async
    },
    [getPosts]
  );

  return (
    <section>
      {posts.map(post => {
        return (<article key={post._id}>POST</article>);
      })}
    </section>
  );
};

export default Posts