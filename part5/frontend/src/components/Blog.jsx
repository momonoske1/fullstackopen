/* eslint-disable linebreak-style */
import { useState } from "react";

const Blog = ({ blog, addLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    addLikes(blog.id, blogObject);
  };

  const showDeleted = blog.user.username === user.username ? true : false;
  console.log(blog.user);
  console.log(user.id);
  
  const handleRemove = (e) => {
    e.preventDefault();
    if (window.confirm(`delete blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div id="hiddenDiv" className="hidden">
        {blog.title} by {blog.author}
        <button id="view-btn" onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div id="visibleDiv" className="visible">
        <div className="title">
          {blog.title}
        </div>
        <div className="url">{blog.url}</div>
        <div id="likes" className="likes">
          <div>
            likes {blog.likes}
            <button id="like-btn" onClick={handleLikes}>
              like
            </button>
          </div>{" "}
        </div>
        <div>{blog.author}</div>
      </div>
      )}
      {showDeleted && <button onClick={handleRemove}>remove</button>}
    </div>
  );
};

export default Blog;
