import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs";

//*[local] D:\Javascript\web\Hybrid\index.js
const __filename = fileURLToPath(import.meta.url);
//*[local] D:\Javascript\web\Hybrid
const __dirname = dirname(__filename);
const app = express();
app.use(express.static("src/public"));
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
	res.render("home/navigate");
});
app.get("/test/:branch", (req, res) => {
	const testPath = __dirname + "/src/views/test";
	const validFileNameList = fs.readdirSync(testPath).map((file) => file.split(".")[0]);
	const branch = req.params.branch;
	if (validFileNameList.includes(branch)) {
		res.render(`test/${branch}`);
	} else {
		res.render("errors/404");
	}
});
app.get("*", (req, res) => {
	res.render("errors/404");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`http://localhost:4000`);
});
