import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path='/' exact>
            <p>Home placeholder  </p>
          </Route>
          <Route path='/posts'>
            <p>Posts placeholder</p>
          </Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
