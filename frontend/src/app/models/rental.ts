export class Rental{
    id!: number
    createdAt!: Date
    cabinId!: number
    cabinName!: string
    cabinLocation!: string
    user!: string
    startDate!: Date
    endDate!: Date
    adults!: number
    children!: number
    description!: string
    comment!: string
    rating!: number
    status!: number
    price!: number
}