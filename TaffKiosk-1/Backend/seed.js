import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.role.deleteMany({});

    await prisma.role.createMany({
      data: [
        {
          roleName: 'Super Admin',
          roleDesc: 'Manages the work',
          createdBy: 'Super Admin',
        },
        {
          roleName: 'Admin',
          roleDesc: 'Administrates operations',
          createdBy: 'Super Admin',
        },
        {
          roleName: 'Manager',
          roleDesc: 'Manages a team or department',
          createdBy: 'Super Admin',
        },
        {
          roleName: 'Employee',
          roleDesc: 'Performs day-to-day tasks',
          createdBy: 'Super Admin',
        },
      ],
    });

    console.log('Roles seeded successfully.');
  } catch (error) {
    console.log("Already created..");
    console.error('Error seeding roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
