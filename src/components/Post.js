// components
import Time from './Time';

const Post = (props) => {
  // props
  const { post } = props;

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <div>
          <a rel="author" href={`/users/${post.author._id}`}>{post.author.displayName}</a>
          <Time time={post.createdAt} />
          {
            post.postStatus === 'draft' &&
            <small>draft</small>
          }
        </div>
      </header>
      <main>{post.text}</main>
    </article>
  );
}

export default Post;