import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function FormRenderer({ formConfig }) {
  const [qualification, setQualification] = useState("");
  const [isGovServant, setIsGovServant] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const initialValues = formConfig.reduce((acc, field) => {
    acc[field.label] = field.type === "checkbox" ? false : "";
    if (field.type === "file") {
      acc[field.label] = null; // Initialize file field as null
    }
    return acc;
  }, {});

  const validationSchema = Yup.object(
    formConfig.reduce((acc, field) => {
      let schema = Yup.string();

      if (field.required) {
        schema = schema.required(`${field.label} is required`);
      }
      if (field.minLength) {
        schema = schema.min(
          field.minLength,
          `${field.label} must be at least ${field.minLength} characters`
        );
      }
      if (field.maxLength) {
        schema = schema.max(
          field.maxLength,
          `${field.label} must be at most ${field.maxLength} characters`
        );
      }
      if (field.type === "email") {
        schema = schema.email("Invalid email address");
      }
      if (field.type === "phone") {
        schema = schema.matches(/^\d{10}$/, "Phone number must be 10 digits");
      }
      //   if (field.type === "file") {
      //     schema = Yup.mixed()
      //       .test(
      //         "fileSize",
      //         "File size is too large",
      //         (value) => value && value.size <= field.maxSize
      //       )
      //       .test(
      //         "fileFormat",
      //         "Unsupported Format",
      //         (value) =>
      //           value &&
      //           field.allowedFormats &&
      //           field.allowedFormats.includes(value.type)
      //       );
      //   }

      acc[field.label] = schema;
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Form Preview
      </h2>
      {formConfig.map((field, index) => {
        if (field.condition && !field.condition(formik.values)) {
          return null; // Skip rendering if the condition is not met
        }

        return (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                {...formik.getFieldProps(field.label)}
                className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {field.type === "textarea" && (
              <textarea
                {...formik.getFieldProps(field.label)}
                className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {field.type === "dropdown" && (
              <select
                {...formik.getFieldProps(field.label)}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (field.label === "Qualification")
                    setQualification(e.target.value);
                }}
                className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <input
                type="checkbox"
                {...formik.getFieldProps(field.label)}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (field.label === "Government Servant")
                    setIsGovServant(e.target.checked);
                }}
                className="mr-2 leading-tight"
              />
            )}

            {field.type === "radio" &&
              field.options.map((option, i) => (
                <label key={i} className="block text-gray-700 font-medium">
                  <input
                    type="radio"
                    name={field.label}
                    value={option}
                    onChange={formik.handleChange}
                    className="mr-2 leading-tight"
                  />
                  {option}
                </label>
              ))}
            {field.type === "file" && (
              <>
                <input
                  type="file"
                  name={field.label}
                  onChange={(event) => {
                    formik.setFieldValue(
                      field.label,
                      event.currentTarget.files[0]
                    );
                    const objectUrl = URL.createObjectURL(
                      event.target.files[0]
                    );
                    setPreviewUrl(objectUrl);
                  }}
                  className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {previewUrl && (
                  <div className="w-1/5 py-2 px-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="cursor-pointer max-h-20 h-auto object-cover"
                    />
                  </div>
                )}
              </>
            )}

            {formik.errors[field.label] && formik.touched[field.label] ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors[field.label]}
              </div>
            ) : null}
          </div>
        );
      })}
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
}

export default FormRenderer;
