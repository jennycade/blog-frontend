import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// components
import Post from '../components/Post';
import Loading from '../components/Loading';

const SinglePost = (props) => {
  // props
  const {
    getPost,
    isLoggedIn, userId,
    postComment, updateComment, deleteComment
  } = props;

  // param
  const { postId } = useParams();

  // state
  const [post, setPost] = useState({});
  const [incrementToFetch, setIncrementToFetch] = useState(0);

  // getPost
  useEffect(() => {
    // define async function
    const fetchData = async () => {
      const newPost = await getPost(postId);
      setPost(newPost);
    }
    // then call it
    fetchData();
  }, [postId, incrementToFetch]);

  // force updates
  const handlePostComment = async (id, text) => {
    await postComment(id, text);
    setIncrementToFetch(incrementToFetch + 1);
  }
  const handleUpdateComment = async (id, text) => {
    await updateComment(id, text);
    setIncrementToFetch(incrementToFetch + 1);
  }
  const handleDeleteComment = async (id) => {
    await deleteComment(id);
    setIncrementToFetch(incrementToFetch + 1);
  }

  return (
    <main className='singlePage'>
      

      { Object.keys(post).length !== 0 ?
        <Post post={post}
          isLoggedIn={isLoggedIn}
          postComment={handlePostComment}
          updateComment={handleUpdateComment}
          deleteComment={handleDeleteComment}
          userId={userId}
          displayType='full'
        >
          { props.children }
        </Post>
        :
        <Loading> 
          {/* TODO: Don't show loading when there's an error */}
          { props.children }
        </Loading>
      }
    </main>
  );
};

export default SinglePost;