// routing
import { Link } from 'react-router-dom';

// components
import Time from './Time';

const Post = (props) => {
  // props
  const { post, commentsDisplay } = props;

  return (
    <article className='post'>
      <header>
        <Link to={`/posts/${post._id}`}><h1>{post.title}</h1></Link>
        <div className='byline'>
          <a rel="author" href={`/users/${post.author._id}`}>{post.author.displayName}</a>
          <Time time={post.createdAt} />
          {
            post.postStatus === 'draft' &&
            <small className='badge draft-badge'>draft</small>
          }
        </div>
      </header>
      <main>{post.text}</main>
      <footer>
        { commentsDisplay === 'count' &&
          <p>{post.comments.length} comments</p>
        }
        { commentsDisplay === 'full' &&
          <p>COMMENTS PLACEHOLDER</p>
        }
      </footer>
    </article>
  );
}

export default Post;