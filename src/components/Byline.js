// components
import Time from './Time';
import { Link } from 'react-router-dom';

const Byline = (props) => {
  // props
  const { article } = props;

  return (
    <div className='byline'>
      <Link rel="author" to={`/users/${article.author._id}`}>
        {article.author.displayName}
      </Link>
      <Time time={article.createdAt} />
      {
        props.children
      }
    </div>
  );
};

export default Byline;