const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch(err => console.error('Lỗi kết nối:', err));