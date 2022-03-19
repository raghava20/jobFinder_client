import './App.css';
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import store from "./redux/store"

import jwtDecode from "jwt-decode"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageNotFound from './pages/404 page/PageNotFound';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard page/Dashboard';
import { getLoggedInUserData, logout } from './redux/actions/authActions';
import { SET_AUTHENTICATED } from './redux/types';
import PostsPage from './pages/posts page/PostsPage';
import CreatePostPage from './pages/create post/CreatePostPage';
import PostPage from './pages/post page/PostPage';
import ProfilesPage from './pages/profiles page/ProfilesPage';
import Appbar from './components/Appbar';
import API_URL from './utils/API_URL';
import ApplicantsPage from './pages/applicants page/ApplicantsPage';
import LandingPage from './pages/landing page/LandingPage';


const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#303f9f",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#e8eaf6',
    },
  },
});

const token = localStorage.getItem("token")
if (token) {
  const decodeToken = jwtDecode(token)
  if (decodeToken.exp * 1000 <= Date.now()) {
    store.dispatch(logout())
    window.location.href = "/login"
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    API_URL.defaults.headers.common["x-auth-token"] = token;
    store.dispatch(getLoggedInUserData())
  }
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Appbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="/jobs" element={<Dashboard />} />
            <Route path="post">
              <Route path="create" element={<CreatePostPage />} />
              <Route path="me" element={<PostsPage />} />
              <Route path=":id" element={<PostPage />} />
            </Route>

            <Route path="profile" >
              <Route path="applicants" element={<ApplicantsPage />} />
            </Route>

            <Route path="applied-jobs" element={<ProfilesPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;