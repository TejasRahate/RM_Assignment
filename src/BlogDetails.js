import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blogs, error, isPending } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?userId=" + id
  );
  const history = useHistory();

  const handleClick = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + blogs.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blogs &&
        blogs.map((blog) => (
          <article>
            <h2>{blog.title}</h2>
            <div>{blog.body}</div>
            <button onClick={handleClick}>delete 🗑️</button>
          </article>
        ))}
    </div>
  );
};

export default BlogDetails;
