import { Field } from 'formik';
import React from 'react';
import { Form } from 'semantic-ui-react';

interface Props {
  label: string;
  options: string[];
  name: string;
}
const TypeSelect = ({ label, options, name }: Props) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="typeSelect">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};

export default TypeSelect;
