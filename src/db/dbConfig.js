import mongoose from 'mongoose';

export const connectToDB =  ()=> {
    try {
        mongoose.connect(
          `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@practiceproject.bxk1syw.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=PracticeProject`
        );
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
