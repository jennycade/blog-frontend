// react
import { useState, useEffect } from 'react';

// components
import Time from '../components/Time';

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
        <article key={post._id}>
          <header>
            <h1>{post.title}</h1>
            <div class="byline">
              <a rel="author" href={`/users/${post.author._id}`}>{post.author.displayName}</a>
              <Time time={post.createdAt} />
            </div>
          </header>
          <main>{post.text}</main>
        </article>
        );
      })}
    </section>
  );
};

export default Posts