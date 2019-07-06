import env from 'dotenv';
import app from './app';

env.config();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
