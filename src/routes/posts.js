// react
import { useState, useEffect } from 'react';

// components
import Post from '../components/Post';

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
        return (
          <Post
            key={post._id}
            post={post}
          />
        );
      })}
      { posts.length === 0 &&
        <p>No posts to display</p>
      }
    </section>
  );
};

export default Posts