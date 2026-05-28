// Textarea — multi-line text input with label and error state

import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`textarea-wrapper ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`textarea-field ${error ? "textarea-error" : ""}`}
        {...props}
      />
      {error && <p className="textarea-error-text">{error}</p>}
      {helperText && !error && <p className="textarea-helper-text">{helperText}</p>}
    </div>
  );
};
