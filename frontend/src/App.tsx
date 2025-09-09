import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddRecipePage from './pages/AddRecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import EditRecipePage from './pages/EditRecipePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
        <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;