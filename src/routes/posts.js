// react
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

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
      <header className='hero'>
        <h1 className='pageTitle'>All posts</h1>
      </header>

      <div className='postsWrapper'>
        { posts.length > 0 &&
        posts.map(post => {
          return (
            <Post
              key={post._id}
              post={post}
              displayType='mini'
            />
          );
        })}
        { posts.length === 0 &&
          <p>No posts to display</p>
        }

        <Outlet /> 
        {/* for single post */}
      </div>

    </main>
  );
};

export default Posts