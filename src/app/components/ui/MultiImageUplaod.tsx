"use client";
import { useState, useRef, ChangeEvent } from "react";

interface MultiImageUploaderProps {
  width?: string;
  onFilesSelected?: (files: File[]) => void;
  buttonText?: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  labelText?: string;
  maxFiles?: number;
}

export default function MultiImageUploader({
  width = "w-full",
  onFilesSelected = () => {},
  buttonText = "Choose Files",
  labelText = "Upload Documents",
  acceptedFileTypes = "image/*",
  maxFileSizeMB = 5,
  maxFiles = 5,
}: MultiImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError("");

    if (selectedFiles.length === 0) return;

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }

    const invalidFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) {
        return true;
      }

      const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return true;
      }

      return false;
    });

    if (invalidFiles.length > 0) {
      setError(
        `Some files were invalid. Please ensure all files are images under ${maxFileSizeMB} MB.`
      );
      return;
    }

    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div className={`${width} relative flex flex-col`}>
      <div className="flex gap-1">
        <div className="mb-2 text-xs font-medium text-gray-700">
          {labelText}
        </div>
        <h1 className="text-[8px] text-gray-400 mt-1">
          (You can select multiple files)
        </h1>
      </div>
      <div className=" bg-white">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          className="hidden"
          multiple
        />

        <div className="flex flex-wrap gap-2 mb-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 rounded-md px-3 py-1"
            >
              <span className="text-sm text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis max-w-xs">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 text-red-400 hover:text-red-500"
              ></button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          className="flex items-center justify-center py-4 px-6 rounded-md border border-[#0088B1] text-[#0088B1] hover:bg-[#0088B1] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0088B1] w-full text-xs"
        >
          <div className="flex gap-1 items-center">
            {buttonText}
            <h1 className="text-[10px] text-gray-400">
              (You can select multiple files)
            </h1>
          </div>
        </button>

        {error && <div className="mt-2 text-sm text-red-400">{error}</div>}
      </div>
    </div>
  );
}
