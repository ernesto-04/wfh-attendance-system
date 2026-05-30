import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  await prisma.employee.create({
    data: {
      name: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role: Role.ADMIN,
      department: 'HRD',
    },
  });

  console.log('Admin created');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
