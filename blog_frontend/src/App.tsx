import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsList from "./components/PostsList";
import BlogAppBar from "./components/AppBar";
import PostSingle from "./components/PostSingle";
import PostFormWrapper from "./components/PostForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogAppBar />
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="posts" element={<PostsList />} />
          <Route path="post/:slug" element={<PostSingle />} />
          <Route path="posts/add" element={<PostFormWrapper />} />
          <Route path="posts/edit/:slug" element={<PostFormWrapper />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
