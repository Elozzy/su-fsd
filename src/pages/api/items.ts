import path from "path";
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) { 
    try {
    const filePath = path.join(process.cwd(), "data.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const items = fileContent.split("\n").map((line) => {
        const [createdAt, fileName] = line.split(";");
        return { createdAt: createdAt.trim(), fileName: fileName.trim() };
    });

    res.status(200).json(items)} catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}