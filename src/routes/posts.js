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
    <main className='posts'>
      { posts.length > 0 &&
      posts.map(post => {
        return (
          <Post
            key={post._id}
            post={post}
            commentsDisplay='count'
          />
        );
      })}
      { posts.length === 0 &&
        <p>No posts to display</p>
      }
    </main>
  );
};

export default Posts