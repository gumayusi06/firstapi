// server.js
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공: / → public/index.html
app.use(express.static(path.join(__dirname, "public")));

// 고양이 사진 API 프록시 엔드포인트
app.get("/cat", async (req, res) => {
  try {
    const headers = {};
    // 선택: CAT_API_KEY가 있으면 헤더에 붙여서 호출(없어도 대부분 잘 작동)
    if (process.env.CAT_API_KEY) headers["x-api-key"] = process.env.CAT_API_KEY;

    const { data } = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      { headers }
    );

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(502).json({ error: "No image returned from Cat API" });
    }

    const { url, width, height, breeds } = data[0];
    res.json({
      url,
      width,
      height,
      breed: breeds && breeds[0] ? breeds[0].name : null,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Cat API request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행: http://localhost:${PORT}`);
});
