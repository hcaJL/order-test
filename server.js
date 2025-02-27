const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = 3000;

// 讀取 JSON 檔案
function getRestaurants() {
    try {
        const data = fs.readFileSync('restaurants.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ 读取 restaurants.json 失败：", error);
        return [];
    }
}

// 提供 API 給前端查詢餐廳列表
app.get('/api/restaurants', (req, res) => {
    const restaurants = getRestaurants().map(({ id, name, url }) => ({ id, name, url }));
    res.json(restaurants);
});

app.listen(PORT, () => {
    console.log(`🚀 伺服器運行在 http://localhost:${PORT}`);
});
