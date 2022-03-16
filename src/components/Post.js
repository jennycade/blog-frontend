// routing
import { Link } from 'react-router-dom';
import Byline from './Byline';
import CommentsSection from './CommentsSection';

// components

const Post = (props) => {
  // props
  const { post, isLoggedIn, postComment, displayType } = props;

  if (displayType==='mini') {
    return (
      <article className='post'>
        <header>
          <div className='postTitle'>
            <h1><Link to={`/posts/${post._id}`}>{post.title}</Link></h1>
            {
              post.postStatus === 'draft' &&
              <small className='badge draft-badge'>draft</small>
            }
          </div>
          <Byline article={post} />
        </header>
        
        <main>{post.text}</main>
  
        <footer>
          <p>{post.comments.length} comments</p>
        </footer>
      </article>
    );
  } else if (displayType === 'full') {
    // single page
    return (
      <>
        <header className='hero'>
          <div className='postTitle pageTitle'>
            <h1>{post.title}</h1>
            {
              post.postStatus === 'draft' &&
              <small className='badge draft-badge'>draft</small>
            }
          </div>
          
        </header>

        <div className="singlePageWrapper">

          { props.children }
          
          <Byline article={post} />
          <p>{post.text}</p>
          <footer>
            <CommentsSection
              comments={post.comments}
              isLoggedIn={isLoggedIn}
              postComment={async (text) => await postComment(post._id, text)}
            />
          </footer>
        </div>
      </>
    );
  }
  
}

export default Post;