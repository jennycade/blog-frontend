import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// routes
import App from './App';
import SignIn from './routes/signin';
import Home from './routes/home';
import Posts from './routes/posts';

const MainRoutes = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='signin' element={<SignIn />} />

          <Route path='home' element={<Home />} />
          <Route path='posts' element={<Posts />} />
          

          <Route path='*' element={
            <main><p>404 not found</p></main>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;