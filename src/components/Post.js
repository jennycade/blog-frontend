// routing
import { Link } from 'react-router-dom';
import Byline from './Byline';
import CommentsSection from './CommentsSection';

// components

const Post = (props) => {
  // props
  const { post, commentsDisplay, isLoggedIn, postComment } = props;

  return (
    <article className='post'>
      <header>
        <h1><Link to={`/posts/${post._id}`}>{post.title}</Link></h1>
        {
          post.postStatus === 'draft' &&
          <small className='badge draft-badge'>draft</small>
        }
        
        <Byline article={post}>
          
        </Byline>
      </header>
      
      <main>{post.text}</main>

      <footer>
        { commentsDisplay === 'count' &&
          <p>{post.comments.length} comments</p>
        }
        { commentsDisplay === 'full' &&
          <CommentsSection
            comments={post.comments}
            isLoggedIn={isLoggedIn}
            postComment={async (text) => await postComment(post._id, text)}
          />
        }
      </footer>
    </article>
  );
}

export default Post;