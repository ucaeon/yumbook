import Header from '../features/common/components/Header';

const AddRecipePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-poppins font-bold text-gray-800 mb-8">
            새 레시피 추가
          </h1>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍳</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              레시피 추가 페이지
            </h3>
            <p className="text-gray-500">
              곧 레시피 추가 폼이 여기에 표시됩니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipePage;
