import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Blog from "./pages/BlogPage";
import ArticlePage from "./pages/BlogPostPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import MyNavbar from "./components/NavBar";
import Footer from "./components/Footer";
import CreateNewArticle from "./pages/NewBlogPost";
import UserProfile from "./pages/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <MyNavbar />
        </header>
        <main data-bs-theme="dark">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/new-blog-post" element={<CreateNewArticle />} />
            <Route path="/blog/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<CreateAccountPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
