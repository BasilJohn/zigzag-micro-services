import app from './app'

const port = process.env.PORT || 3032;

app.listen(port, () => {
  console.log(`🚀 Media Service running on port ${port}`);
});

app.listen()