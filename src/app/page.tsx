"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import DropDown from "./Components/Dropdown";

type Item = {
  createdAt: string;
  fileName: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  const [sortType, setSortType] = useState("createdAt");

  useEffect(() => {
    axios.get("/api/items").then((response) => setItems(response.data));
  }, []);

  const sortItems = () => {
    const sortedItems = [...items];
    if (sortType === "createdAt") {
      sortedItems.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortType === "filenameAsc") {
      sortedItems.sort((a, b) =>
        a.fileName
          .replace(/\d+/g, (n) => n.padStart(10, "0"))
          .localeCompare(b.fileName.replace(/\d+/g, (n) => n.padStart(10, "0")))
      );
    } else if (sortType === "filenameDesc") {
      sortedItems.sort((a, b) =>
        b.fileName
          .replace(/\d+/g, (n) => n.padStart(10, "0"))
          .localeCompare(a.fileName.replace(/\d+/g, (n) => n.padStart(10, "0")))
      );
    }
    return sortedItems;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Dropdown */}
      <div className="mb-5">
        <DropDown onSelect={setSortType} currentSort={sortType} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-[45rem] px-4">
        {sortItems().map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-4  ring-1 ring-gray-300 ring-inset bg-white rounded-lg "
          >
            <p className="text-gray-700 font-medium">
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{item.fileName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
