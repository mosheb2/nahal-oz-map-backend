const PORT = process.env.PORT || 3000;
const app = require('./app');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:secret@localhost:27017/locations?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1';



const connectDB = async () => {
    await mongoose.connect(MONGO_URI, {})}

async function main() {
    try {
        // Connect to the database
        await connectDB();
        console.log('Database connected successfully');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
}

main()