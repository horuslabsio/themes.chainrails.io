import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navigation from "./components/Navigation";
import AuthCallback from "./components/AuthCallback";
import ThemeStore from "./pages/ThemeStore";
import ThemeCreator from "./pages/ThemeCreator";
import ThemeEditor from "./pages/ThemeEditor";
import ThemeDetails from "./pages/ThemeDetails";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AuthCallback />
        <Navigation />
        <Routes>
          <Route path="/" element={<ThemeStore />}>
            <Route path="create" element={<ThemeCreator />} />
          </Route>
          <Route path="/mine" element={<ThemeStore />}>
            <Route path="create" element={<ThemeCreator />} />
          </Route>
          <Route path="/edit/:themeName" element={<ThemeEditor />} />
          <Route path="/theme/:slug" element={<ThemeDetails />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}
