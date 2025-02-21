"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <div>
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="createdAt">Sort by Created At</option>
        <option value="filenameAsc">Sort by Filename Asc</option>
        <option value="filenameDesc">Sort by Filename Desc</option>
      </select>
      <ul>
        {sortItems().map((item, index) => (
          <li key={index}>
            {item.fileName} - {new Date(item.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
