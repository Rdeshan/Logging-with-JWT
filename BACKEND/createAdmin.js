const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Create admin user
        const adminUser = new User({
            username: 'Raviperera',
            email: 'mama2003@gmail.com',
            password: '227282003', // This will be hashed automatically
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log(adminUser.email);
        console.log(adminUser.password);

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin(); 