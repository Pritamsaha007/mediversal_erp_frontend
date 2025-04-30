"use client";
import { useState, useRef, ChangeEvent } from "react";

interface ImageUploaderProps {
  width?: string;
  onFileSelected?: (file: File) => void;
  buttonText?: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  labelText?: string;
}

export default function ImageUploader({
  width = "w-full",
  onFileSelected = () => {},
  buttonText = "Choose File",
  labelText = "Upload Image",
  acceptedFileTypes = "image/*",
  maxFileSizeMB = 5,
}: ImageUploaderProps) {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxFileSizeMB} MB`);
      return;
    }

    setFileName(file.name);
    onFileSelected(file);
  };

  return (
    <div className={`${width} relative flex flex-col items-center`}>
      <div className="mb-2 text-xs font-medium text-gray-700 self-start">
        {labelText}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className="flex items-center justify-center py-3 px-3 rounded-md bg-[#0088B1] text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0088B1] w-full text-xs"
      >
        {fileName ? (
          <div className="text-red-400 overflow-hidden whitespace-nowrap text-ellipsis max-w-full text-xs">
            {fileName}
          </div>
        ) : (
          <div className="text-white">{buttonText}</div>
        )}
      </button>

      {error && (
        <div className="mt-2 text-sm text-red-400 self-start">{error}</div>
      )}
    </div>
  );
}
