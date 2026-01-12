import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { products } from '../src/lib/data'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // Create default users
    const adminPassword = await bcrypt.hash('password', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@minishop.com' },
        update: {},
        create: {
            email: 'admin@minishop.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'SELLER',
        },
    })

    console.log({ admin })

    const buyerPassword = await bcrypt.hash('password', 10)
    const buyer = await prisma.user.upsert({
        where: { email: 'buyer@minishop.com' },
        update: {},
        create: {
            email: 'buyer@minishop.com',
            name: 'Buyer User',
            password: buyerPassword,
            role: 'BUYER',
        },
    })

    console.log({ buyer })

    // Seed products
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                title: p.title,
                price: p.price,
                description: p.description,
                category: p.category,
                image: p.image,
                brand: p.brand || 'Generic',
                ratingRate: p.rating.rate,
                ratingCount: p.rating.count,
                sellerId: admin.id,
            },
        })
        console.log(`Created product with id: ${product.id}`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
