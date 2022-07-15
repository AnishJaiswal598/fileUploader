// import express from 'express';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import connectDB from './Config/db.js';
// import userRoute from './Routes/userRoute.js'

// dotenv.config();
// await connectDB();
// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(morgan(':method :url :status :response-time ms'));

// app.use('/user',userRoute);

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// export default app;
const fastify = require('fastify'); //Bring in Fastify
const PORT = process.env.PORT || 3000;
const app = fastify({
  logger: true
})
// Declare a route
app.get("/", async () => {
  return {
    Message: "Fastify is On Fire"
  }
})
//Funtion To run the server
const start = async () => {
  try {
    await app.listen(PORT)
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start();
