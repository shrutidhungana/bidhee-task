import React from "react";
import { useRouter } from "next/navigation";

type EmptyProps = {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: "card" | "table"; // Only two variants now
};

const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  buttonText,
  buttonLink = "/",
  variant = "card",
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(buttonLink);
  };

  const content = (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      {description && <p className="text-gray-700 mt-2">{description}</p>}
      {buttonText && (
        <button
          onClick={handleButtonClick}
          className="mt-4 px-6 py-2 text-sm text-black border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );

  if (variant === "card") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
        {content}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-lg font-semibold text-black">
                {title}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-sm text-gray-700 py-2">{description}</td>
            </tr>
          </tbody>
        </table>
        {buttonText && (
          <button
            onClick={handleButtonClick}
            className="mt-4 px-6 py-2 text-sm text-black border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            {buttonText}
          </button>
        )}
      </div>
    );
  }

  // Fallback to card if variant is unknown
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
      {content}
    </div>
  );
};

export default Empty;
