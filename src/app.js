const http = require("http");
const express = require("express");
const loader = require("./loader");
const config = require("./config");
const apiRouter = require("./router");

create = async () => {
	console.log("시작");
	await loader.connectMongoDB();
	console.log("express application 초기화");
	
	const app = express();
	app.use(express.json());

	// health check api? 용도를 모르겠다.
	// app.get("/helath", (req, res, next) => {
	// 	res.json({
	// 		status: "OK",
	// 	});
	// });

	// version 1의 api router 등록
	app.use("/api/v1", apiRouter.v1);

	// 해당되는 URL이 없을 때를 대비한 미들웨어
	app.use((req, res, next) => {
		next(
			// new AppError()
		);
	});

	// 에러 핸들러 등록


	// express와 http.Server 분리
	const server = http.createServer(app);

	const serverApp = {
		start() {
			server.listen(config.port);
			server.on("listening", () => {
				console.log(`서버가 포트 ${config.port}에서 구동중입니다.`);
			});
		},
		// 서버 중지를 위함. ctrl + c 누른 직후 실행
		stop() {
			console.log("서버를 중지하고 있습니다.");
			this.isShuttingDown = true;
			return new Promise((resolve, reject) => {
				server.close(async (error) => {
					if (error !== undefined) {
						console.log(`HTTP 서버 중지 실패: ${error.message}`);
						reject(error);
					}
					console.log("더 이상 커넥션을 받지 않습니다.");
					await loader.disconnectMongoDB();
					console.log("DB 커넥션을 정상적으로 끊었습니다.");
					console.log("서버 중지 작업 성공하였습니다.");
					this.isShuttingDown = false;
					resolve();
				});
			});
		},
		isShuttingDown: false, // 서버가 중지하는 상태인지를 확인하는 플래그
		_app: app,
	};

	return serverApp;
}

module.exports = create;
