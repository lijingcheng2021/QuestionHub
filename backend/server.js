const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

dotenv.config();

// 添加更多日志
console.log('初始化服务器...');
console.log('环境变量:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

const adapter = new FileSync('db.json');
const db = low(adapter);

// 设置默认数据
db.defaults({ posts: [] }).write();

const app = express();

// 配置 CORS
app.use(cors({
  origin: '*', // 允许所有来源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 添加测试路由
app.get('/api/test', (req, res) => {
  res.json({ message: '服务器正常运行' });
});

// 帖子路由
app.get('/api/posts', (req, res) => {
  console.log('收到获取帖子请求');
  try {
    const posts = db.get('posts').value();
    console.log('返回帖子:', posts);
    res.json(posts);
  } catch (error) {
    console.error('获取帖子错误:', error);
    res.status(500).json({ message: '获取帖子失败' });
  }
});

app.post('/api/posts', (req, res) => {
  console.log('收到创建帖子请求:', req.body);
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: '标题和内容不能为空' });
    }

    const post = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString()
    };

    db.get('posts')
      .push(post)
      .write();

    console.log('创建帖子成功:', post);
    res.status(201).json(post);
  } catch (error) {
    console.error('创建帖子错误:', error);
    res.status(500).json({ message: '发布帖子失败' });
  }
});

const PORT = process.env.PORT || 9528;

// 启动服务器
const server = app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`API 地址: http://localhost:${PORT}/api`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`端口 ${PORT} 已被占用，尝试使用端口 ${PORT + 1}`);
    server.close();
    app.listen(PORT + 1, () => {
      console.log(`服务器运行在端口 ${PORT + 1}`);
    });
  } else {
    console.error('服务器启动错误:', err);
  }
}); 