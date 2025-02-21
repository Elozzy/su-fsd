import path from "path";
import fs from 'fs';

export default function handler(req:any, res:any) { 
    const filePath = path.join(process.cwd(), "data.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const items = fileContent.split("\n").map((line) => {
        const [createdAt, fileName] = line.split(";");
        return { createdAt: createdAt.trim(), fileName: fileName.trim() };
    });

    res.status(200).json(items)
}