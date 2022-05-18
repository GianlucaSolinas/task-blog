import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import BlogAppBar from "./components/AppBar";
import { AuthProvider } from "./context/AuthContext";
import routes from "./routes";
import ProtectedPage from "./components/ProtectedPage";
import { SnackbarProvider } from "notistack";
import NotFound from "./components/NotFound";

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
    <SnackbarProvider autoHideDuration={2500}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BlogAppBar />
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/posts" replace />} />
              {routes.map(({ path, element, isProtected }) => {
                if (isProtected) {
                  return <Route path={path} element={<ProtectedPage>{element}</ProtectedPage>} />;
                } else {
                  return <Route path={path} element={element} />;
                }
              })}
              <Route path={"*"} element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
