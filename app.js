const express = require('express');
const app = express();
const {connectToMongo} = require('./util/database');
const productRoutes = require('./routes/product_routes')
const userRoutes = require('./routes/user_routes');
const cartRoutes = require('./routes/cart_routes');
const orderRoutes = require('./routes/order_routes')

app.use(express.json());

app.use('/api',productRoutes);
app.use('/user',userRoutes);
app.use('/user/cart',cartRoutes);
app.use('/user/order',orderRoutes);

const startServer = async () => {
  try {
    await connectToMongo(); // await DB connection
       
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();
