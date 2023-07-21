import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
}

const FormItem = ({ children, label }: Props) => {
  return (
    <div className="form-row">
      <label className="form-label">{label}:</label>
      {children}
    </div>
  );
};

export default FormItem;
