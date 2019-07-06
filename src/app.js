import express from 'express';

const app = express();
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
app.use('*', (req, res) => {
  res
    .status(404)
    .json({
      message: 'welcome to the beginning of nothingness'
    });
});

export default app;
