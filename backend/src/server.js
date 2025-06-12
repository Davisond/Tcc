const app = require('./app');
const dotenv = require('dotenv').config();

const PORT = process.dotenv.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on //localhost:${PORT}`));