// src/App.js
import React, { useState } from "react";
import FormBuilder from "./Components/FormBuilder";
import FormRenderer from "./Components/FormRenderer";

function App() {
  const [formConfig, setFormConfig] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Dynamic Form Generator
      </h1>
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg flex">
        <div className="w-1/3 border-r border-gray-300 pr-6 left-0">
          <FormBuilder setFormConfig={setFormConfig} />
        </div>

        <div className="w-2/3 ml-1/3 pl-8">
          {formConfig.length > 0 ? (
            <FormRenderer formConfig={formConfig} />
          ) : (
            <div className="border border-gray-300 rounded p-4">
              <p className="py-3">Your form will display here...</p>
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                const json = JSON.stringify(formConfig);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "form-config.json";
                link.click();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Configuration
            </button>
            <input
              type="file"
              accept="application/json"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  setFormConfig(JSON.parse(event.target.result));
                };
                reader.readAsText(file);
              }}
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
