import { Button } from "react-bootstrap";
import ArticlesList from "../components/ArticlesList";
import articles from "./article-content";

const Blog = () => {
  return (
    <>
      <h1 className="text-center">Top Articles</h1>
      <Button
        className="ms-5 mb-2"
        variant="warning"
        type="button"
        href="/new-blog-post"
      >
        <i className="bi bi-plus-lg me-2"></i>Create a new Blog Post
      </Button>
      <ArticlesList articles={articles} />
    </>
  );
};

export default Blog;
