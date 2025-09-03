import { PrismaClient } from "../app/generated/prisma";
import bcrypt from 'bcryptjs';

// Let's initialize a sample user
const prisma = new PrismaClient();

async function main() {
    // Hash password for user
    const passHash = await bcrypt.hash('password', 10);

    const user = await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {},
        create: {
            email: 'user@gmail.com',
            password: passHash
        },
    });
    console.log('Seeded user:', { id: user.id, email: user.email });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
