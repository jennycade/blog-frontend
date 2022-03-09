// routing
import { Link } from 'react-router-dom';
import Byline from './Byline';
import CommentsSection from './CommentsSection';

// components

const Post = (props) => {
  // props
  const { post, commentsDisplay } = props;

  return (
    <article className='post'>
      <header>
        <Link to={`/posts/${post._id}`}><h1>{post.title}</h1></Link>
        <Byline article={post}>
          {
            post.postStatus === 'draft' &&
            <small className='badge draft-badge'>draft</small>
          }
        </Byline>
      </header>
      <main>{post.text}</main>
      <footer>
        { commentsDisplay === 'count' &&
          <p>{post.comments.length} comments</p>
        }
        { commentsDisplay === 'full' &&
          <CommentsSection comments={post.comments} />
        }
      </footer>
    </article>
  );
}

export default Post;