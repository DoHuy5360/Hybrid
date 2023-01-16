import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

//*[local] D:\Javascript\web\Hybrid\index.js
const __filename = fileURLToPath(import.meta.url);
//*[local] D:\Javascript\web\Hybrid
const __dirname = dirname(__filename);
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
	res.send("Hell");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`http://localhost:4000`);
});
