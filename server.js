// 服务端代码
'use strict';

const http = require('http');

const staticHandler = require('./lib/staticHandler');
const oploadHandler = require('./lib/uploadHandler')
const listHandle = require('./lib/listHandler')

// 端口号
const port = 3000;
const server = http.createServer((req, res) => {
    let pathUrl = req.url;

    console.log(`请求: [${req.method}]${pathUrl}`);

    // 默认路径
    if (!pathUrl || pathUrl === '/') pathUrl = 'index.html';

    // TODO: 文件上传处理 /pic/upload
    if (pathUrl.endsWith('upload')) {
        return oploadHandler(req, res);
    }
    // TODO: 数据查询接口 /pic/list
    if (pathUrl.endsWith('/pic/list')) {
        return listHandle(req, res);
    }
    // TODO: 处理静态文件
    return staticHandler(pathUrl, res);
});

server.timeout = 3000; // 超时时间3s(便于项目调试，实际项目中无需指定)
server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});