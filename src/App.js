import './App.css';

// routing
import { Link, Outlet } from 'react-router-dom';

// components
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <menu>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
      </menu>

      <Outlet />
    </div>
  );
}

export default App;
