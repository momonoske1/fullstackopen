/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ErrorNotification from "./components/ErrorNotification";
import ValidNotification from "./components/ValidNotification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validMessage, setValidMessage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedBlogUser) {
      const user = JSON.parse(loggedBlogUser);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      });
    }
  }, [refresh]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setValidMessage("valid credentials");
      setTimeout(() => {
        setValidMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setValidMessage(
        `A new blog titled ${newBlog.title} by ${newBlog.author} added`
      );
      setTimeout(() => {
        setValidMessage(null);
      }, 5000);
      setRefresh(!refresh);
    } catch (exception) {
      setErrorMessage("something went wrong");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setUsername("");
    setPassword("");
    setRefresh(!refresh);
  };

  const addLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject);
    setRefresh(!refresh);
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    setRefresh(!refresh);
  };

  const loginForm = () => (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>
  );

  return (
    <div>
      {!user && (
        <div>
          <ErrorNotification message={errorMessage} />
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          <ValidNotification message={validMessage} />
          <br />
          <div>
            {user.name} logged-in
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </div>
          <br />
          <Togglable buttonLabel="create new Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br />
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLikes={addLikes}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
