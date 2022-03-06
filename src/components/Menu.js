import { Link } from 'react-router-dom';

const Menu = (props) => {
  return (
    <menu>
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
    </menu>
  );
}

export default Menu;