import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Hell");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`http://localhost:4000`);
});
