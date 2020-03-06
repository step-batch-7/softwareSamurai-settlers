const { app } = require('./src/app');
const { env } = process;

const port = env.PORT || 8000;

app.listen(port);
