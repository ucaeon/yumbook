import type { FormFieldProps } from '../types/recipeForm';

const FormField = ({ label, error, required = false, children }: FormFieldProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-xl font-bold text-gray-800 font-suit">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-sm font-inter">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
