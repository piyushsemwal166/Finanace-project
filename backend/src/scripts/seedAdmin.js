import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';

const seed = async () => {
  await connectDB(env.mongoUri);

  const defaultUsers = [
    {
      name: 'Admin User',
      email: 'admin@financeapp.com',
      password: 'Admin@12345',
      role: 'Admin'
    },
    {
      name: 'Analyst User',
      email: 'analyst@financeapp.com',
      password: 'Analyst@12345',
      role: 'Analyst'
    },
    {
      name: 'Viewer User',
      email: 'viewer@financeapp.com',
      password: 'Viewer@12345',
      role: 'Viewer'
    }
  ];

  for (const defaultUser of defaultUsers) {
    const hashedPassword = await bcrypt.hash(defaultUser.password, 12);

    await User.findOneAndUpdate(
      { email: defaultUser.email },
      {
        name: defaultUser.name,
        email: defaultUser.email,
        password: hashedPassword,
        role: defaultUser.role,
        status: 'active'
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log('Demo users seeded:');
  console.log('Admin   -> admin@financeapp.com / Admin@12345');
  console.log('Analyst -> analyst@financeapp.com / Analyst@12345');
  console.log('Viewer  -> viewer@financeapp.com / Viewer@12345');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});