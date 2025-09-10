import Modal from './Modal';
import Button from '../../features/common/components/Button';
import { cn } from '../utils/cn';
import type { ConfirmModalProps } from '../types/modal';

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (!loading) {
      onCancel();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="sm">
      <div className="text-center">
        {/* 아이콘 */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg 
            className="h-6 w-6 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 font-suit">
          {title}
        </h3>

        {/* 메시지 */}
        <p className="text-sm text-gray-500 mb-6 font-inter">
          {message}
        </p>

        {/* 버튼들 */}
        <div className="flex space-x-3 justify-center">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="px-6"
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            disabled={loading}
            className="px-6"
          >
            {loading ? '처리 중...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
