"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, preview?: string) => void;
  storageKey?: string; // localStorage key for persistence
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  storageKey,
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) setPreview(saved);
    }
  }, [storageKey]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        if (storageKey) localStorage.setItem(storageKey, result);
        onChange(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(value || null);
      if (storageKey) localStorage.removeItem(storageKey);
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
