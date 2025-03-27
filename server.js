const express = require('express');
const cors = require('cors');
const app = express();

// 配置CORS中间件
app.use(cors({
  origin: 'http://localhost:5173', // 允许前端开发服务器的域名
  methods: ['POST', 'OPTIONS'], // 允许的HTTP方法
  allowedHeaders: ['Content-Type'] // 允许的请求头
}));

// 解析JSON请求体
app.use(express.json());

// 语音生成接口
app.post('/v1/audio/speech', (req, res) => {
  // 这里是模拟的响应
  // 在实际应用中，这里应该调用真实的语音生成服务
  res.json({ message: '语音生成成功' });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://127.0.0.1:${PORT}`);
});