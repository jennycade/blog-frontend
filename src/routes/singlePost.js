import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// components
import Post from '../components/Post';
import Loading from '../components/Loading';

const SinglePost = (props) => {
  // props
  const { getPost, isLoggedIn, postComment } = props;

  // param
  const { postId } = useParams();

  // state
  const [post, setPost] = useState({});

  // getPost
  useEffect(() => {
    // define async function
    const fetchData = async () => {
      const newPost = await getPost(postId);
      setPost(newPost);
    }
    // then call it
    fetchData()
      .catch(console.error);
  }, [getPost, postId]);

  return (
    <main>
      { Object.keys(post).length !== 0 ?
        <Post post={post}
          commentsDisplay='full'
          isLoggedIn={isLoggedIn}
          postComment={postComment}
        />
        :
        <Loading />
      }
      {/* TODO: add loading indicator */}
    </main>
  );
};

export default SinglePost;