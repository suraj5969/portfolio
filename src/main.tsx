import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Lazy-load blog pages — they're only fetched when the user navigates to /blog
const BlogListPage = lazy(() => import('./components/blog/BlogListPage'))
const BlogPostPage = lazy(() => import('./components/blog/BlogPostPage'))

const BlogLoading = () => (
  <div className="blog-loading" style={{ minHeight: '100vh' }}>
    <div className="blog-spinner" />
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<BlogLoading />}>
              <BlogListPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<BlogLoading />}>
              <BlogPostPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
