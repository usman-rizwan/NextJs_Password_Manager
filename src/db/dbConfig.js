import mongoose from 'mongoose';

export const connectToDB =  ()=> {
    try {
        mongoose.connect(process.env.DB_URI);
        const connection = mongoose.connection;
        connection.on("coonected", () => {
          console.log("MongoDb connected successfully===>", err);
        });
        connection.on("error", (err) => {
          console.log("Connection failed" , err);
          process.exit();
        });
        
    } catch (error) {
        console.log("Error in connecting to MongoDb ====>", error.message);
    }
};
