require("dotenv").config();

const express = require('express');
const path = require("path");

const app = express();
const { PORT } = process.env;

app.listen(PORT, () => {
	console.log('서버 실행 중');
});

const pagesPath = path.join(__dirname, "../front-end/src/views");
const userRouter = require("./src/api/routes/userRouter");

app.use(express.static(pagesPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
// app.get('/', (req, res) => {
// 	res.send('hello express');
// });

// app.get('/api', (req, res) => {  // localhost:3065/api
// 	res.send('hello api');
// });

