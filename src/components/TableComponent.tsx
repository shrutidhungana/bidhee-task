"use client";

import React from "react";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Tooltip from "@/components/Tooltip";

export interface TableRow {
  id: number | string;
  imageUrl?: string;
  title?: string;
  genre?: string;
  year?: number | string;
  language?: string;
  [key: string]: any; 
}

interface TableProps {
  columns: { key: string; label: string }[]; 
  data: TableRow[];
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-purple-700 text-white">
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-4 text-left">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="py-3 px-4 text-center">Edit</th>
            )}
            {(onEdit || onDelete) && (
              <th className="py-3 px-4 text-center">Delete</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4">
                  {col.key === "imageUrl" && row[col.key] ? (
                    <Image
                      src={row[col.key] as string}
                      alt={row.title || "Image"}
                      width={60}
                      height={90}
                      className="object-cover rounded"
                    />
                  ) : (
                    row[col.key] ?? "-"
                  )}
                </td>
              ))}

              {onEdit && (
                <td className="py-2 px-4 text-center">
                  <Tooltip text="Edit">
                    <button
                      onClick={() => onEdit(row.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit size={18} />
                    </button>
                  </Tooltip>
                </td>
              )}

              {onDelete && (
                <td className="py-2 px-4 text-center">
                  <Tooltip text="Delete">
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </Tooltip>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
