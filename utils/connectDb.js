import { connect } from 'mongoose';

const connection = {};
const connectDb = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  const db = await connect("process.env.MONGO_SRV", {
    useNewUrlParser: true,
    useUnifiedTopology: true ,    
  });

  console.log('DB connected');
  connection.isConnected = db.connections[0].readyState;
};

export default connectDb;

