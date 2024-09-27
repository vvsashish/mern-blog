import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import articles from "./article-content";
import { Button, Card, Container } from "react-bootstrap";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <Container>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <div className="upvotes-section mb-3">
            {user ? (
              <Button
                variant="danger"
                onClick={addUpvote}
                disabled={!canUpvote}
              >
                {canUpvote ? (
                  <>
                    <i class="bi bi-balloon-heart"></i>Upvote
                  </>
                ) : (
                  <>
                    <i class="bi bi-balloon-heart-fill">Upvoted</i>
                  </>
                )}
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Log in to upvote
              </Button>
            )}
            <p className="mt-2">
              This article has {articleInfo.upvotes} upvote(s)
            </p>
          </div>
          {article.content.map((paragraph, i) => (
            <Card.Text key={i}>{paragraph}</Card.Text>
          ))}
          {user ? (
            <AddCommentForm
              articleName={articleId}
              onArticleUpdated={(updatedArticle) =>
                setArticleInfo(updatedArticle)
              }
            />
          ) : (
            <Button variant="secondary" disabled>
              Log in to add a comment
            </Button>
          )}
          <CommentsList comments={articleInfo.comments} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArticlePage;
