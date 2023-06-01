import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {
    let orders = await prisma.orders.findMany({
        where: {userId: event.context.params.userId},
        ordersBy: {id: "desc"},
        include: {
            orderItem: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders
})