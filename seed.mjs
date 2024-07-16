import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/bookModel.mjs';
import Request from './models/requestModel.mjs';
import Trade from './models/tradeModel.mjs';
import User from './models/userModel.mjs';
import { faker } from '@faker-js/faker';

dotenv.config();

const uri = process.env.MONGODB_URI;

const seedDatabase = async () => {
  if (!uri) {
    console.error('MONGO_URI is not defined in .env');
    return;
  }

  try {
    await mongoose.connect(uri);

    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    await Request.deleteMany({});
    await Trade.deleteMany({});

    // Seed Users
    const users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        name: faker.person.fullName(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        country: faker.location.country()
      });
    }
    const insertedUsers = await User.insertMany(users);
    const userIds = insertedUsers.map(user => user._id);

    // Seed Books
    const books = [];
    for (let i = 0; i < 50; i++) {
      books.push({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        owner: userIds[Math.floor(Math.random() * userIds.length)]
      });
    }
    const insertedBooks = await Book.insertMany(books);
    const bookIds = insertedBooks.map(book => book._id);

    // Seed Requests
    const requests = [];
    for (let i = 0; i < 30; i++) {
      const request = {
        requester: userIds[Math.floor(Math.random() * userIds.length)],
        ownedBooks: [bookIds[Math.floor(Math.random() * bookIds.length)]],
        requestedBooks: [bookIds[Math.floor(Math.random() * bookIds.length)]],
        status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)]
      };
      requests.push(request);

      // Update the user's incomingRequests
      await User.updateOne(
        { _id: request.requestedBooks[0].owner },
        { $push: { incomingRequests: request._id } }
      );
    }
    await Request.insertMany(requests);

    // Seed Trades
    const trades = [];
    for (let i = 0; i < 20; i++) {
      trades.push({
        user: userIds[Math.floor(Math.random() * userIds.length)],
        offeredBook: bookIds[Math.floor(Math.random() * bookIds.length)],
        requestedBook: bookIds[Math.floor(Math.random() * bookIds.length)],
        status: ['Pending', 'Completed', 'Rejected'][Math.floor(Math.random() * 3)]
      });
    }
    await Trade.insertMany(trades);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
