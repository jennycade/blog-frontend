// components
import Time from './Time';

const Byline = (props) => {
  // props
  const { article } = props;

  return (
    <div className='byline'>
      <a rel="author" href={`/users/${article.author._id}`}>{article.author.displayName}</a>
      <Time time={article.createdAt} />
      {
        props.children
      }
    </div>
  );
};

export default Byline;