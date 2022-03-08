// components
import Time from './Time';

const Post = (props) => {
  // props
  const { post } = props;

  return (
    <article className='post'>
      <header>
        <h1>{post.title}</h1>
        <div className='byline'>
          <a rel="author" href={`/users/${post.author._id}`}>{post.author.displayName}</a>
          <Time time={post.createdAt} />
          {
            post.postStatus === 'draft' &&
            <small>draft</small>
          }
        </div>
      </header>
      <main>{post.text}</main>
      <footer>
        {/* comments */}
      </footer>
    </article>
  );
}

export default Post;