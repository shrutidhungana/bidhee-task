"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

interface ImageUploadProps {
  value?: string; // Base64 string
  onChange: (file: File | null, base64?: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onChange(file, base64);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-40 h-60 relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
        {preview ? (
          <Image
            src={preview}
            alt="Selected image"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <FiUpload size={36} className="text-gray-400" />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2"
      />
    </div>
  );
};

export default ImageUpload;
