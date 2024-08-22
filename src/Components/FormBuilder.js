// src/components/FormBuilder.js
import React, { useState } from "react";

function FormBuilder({ setFormConfig }) {
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    options: [],
    required: false,
    fileTypes: [], // Initialize as an empty array
    maxSize: null, // Initialize as 0 for no size limit
  });

  const addField = () => {
    setFields([...fields, newField]);
    setNewField({
      label: "",
      type: "text",
      options: [],
      required: false,
      fileTypes: [], // Reset to an empty array
      maxSize: null, // Reset to 0
    });
    setFormConfig([...fields, newField]);
  };

  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    setFormConfig(updatedFields);
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewField({
      ...newField,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addOption = () => {
    setNewField({ ...newField, options: [...newField.options, ""] });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = newField.options.map((option, i) =>
      i === index ? value : option
    );
    setNewField({ ...newField, options: updatedOptions });
  };

  const handleFileTypeChange = (index, value) => {
    const updatedFileTypes = newField.fileTypes.map((type, i) =>
      i === index ? value : type
    );
    setNewField({ ...newField, fileTypes: updatedFileTypes });
  };

  const addFileType = () => {
    setNewField({ ...newField, fileTypes: [...newField.fileTypes, ""] });
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Form Builder
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          name="label"
          placeholder="Field Label"
          value={newField.label}
          onChange={handleFieldChange}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          value={newField.type}
          onChange={handleFieldChange}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text Input</option>
          <option value="textarea">Text Area</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio Button</option>
          <option value="file">File Upload</option>
        </select>

        {newField.type === "dropdown" || newField.type === "radio" ? (
          <>
            {newField.options.map((option, index) => (
              <input
                key={index}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <button
              type="button"
              onClick={addOption}
              className="self-start px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Option
            </button>
          </>
        ) : null}

        {newField.type === "file" && (
          <>
            {newField.fileTypes.map((type, index) => (
              <input
                key={index}
                placeholder={`File Type ${index + 1} (e.g., image/png)`}
                value={type}
                onChange={(e) => handleFileTypeChange(index, e.target.value)}
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <button
              type="button"
              onClick={addFileType}
              className="self-start px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add File Type
            </button>

            <label>File Size (KB)</label>
            <input
              type="number"
              name="maxSize"
              placeholder="Max File Size (KB)"
              value={newField.maxSize}
              onChange={handleFieldChange}
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
          </>
        )}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="required"
            checked={newField.required}
            onChange={handleFieldChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">Required</span>
        </label>

        <button
          type="button"
          onClick={addField}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Field
        </button>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mt-6">
        Current Fields
      </h3>
      <ul className="list-disc pl-6 space-y-2">
        {fields.map((field, index) => (
          <li key={index} className="flex justify-between items-center">
            {field.label} ({field.type}){" "}
            {field.required ? (
              <span className="text-red-500">(Required)</span>
            ) : null}
            <button
              type="button"
              onClick={() => removeField(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormBuilder;
