import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsList from "./components/PostsList";
import BlogAppBar from "./components/AppBar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogAppBar />
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="posts" element={<PostsList />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
