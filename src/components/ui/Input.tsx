import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {}

export function InputField({
  label,
  name,
  error,
  hint,
  required,
  className = '',
  ...props
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="form-label__required">*</span>}
      </label>
      <input
        id={name}
        name={name}
        className={`form-input ${error ? 'form-input--error' : ''} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        {...props}
      />
      {hint && !error && (
        <span id={`${name}-hint`} className="form-hint">
          {hint}
        </span>
      )}
      {error && (
        <span id={`${name}-error`} className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function SelectField({
  label,
  name,
  error,
  required,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="form-label__required">*</span>}
      </label>
      <select
        id={name}
        name={name}
        className={`form-select ${error ? 'form-select--error' : ''}`}
        aria-invalid={!!error}
        {...props}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextareaField({ label, name, error, required, ...props }: TextareaFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="form-label__required">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        className={`form-textarea ${error ? 'form-input--error' : ''}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className="form-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
