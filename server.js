const express = require('express');
const demoRoutes = require('./routes/demoRoute');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', demoRoutes);

async function startServer() {
    try {
        app.listen(PORT, () => {
            console.log(`Server tại http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Lỗi khởi động server:', err);
    }
}

startServer();
