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
      const fetchData = async () => {
        const newPosts = await getPosts();
        setPosts(newPosts);
      }
      
      fetchData()
        .catch(console.error);
    },
    [getPosts]
  );

  return (
    <section>
      { posts.length > 0 &&
      posts.map(post => {
        return (<article key={post._id}>POST</article>);
      })}
    </section>
  );
};

export default Posts