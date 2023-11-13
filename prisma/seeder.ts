import { PrismaClient } from "@prisma/client";
import { generateHash } from "../src/utils/bcrypt";

const prisma = new PrismaClient();

// dummy data
const Products = [
  {
    name: "CPU Intel Core i7",
    stock: 50,
    price: 3000000,
    categoryId: 1,
    userId: 1,
  },
];

const Categories = [
  {
    name: "Hardware",
  },
];

const Users = [
  {
    username: "admin",
    password: generateHash("admin"),
    role: 1,
  },
];

async function main() {
  for (const User of Users) {
    await prisma.user.create({
      data: User,
    });
  }
  for (const Category of Categories) {
    await prisma.category.create({
      data: Category,
    });
  }
  Products.forEach(async (Product) => {
    await prisma.product.create({
      data: Product,
    });
  });
  console.log("Seeder run successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
