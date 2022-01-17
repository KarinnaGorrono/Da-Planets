import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export const GalaxySchema = new Schema(
    {
        name: { type: String, required: true },
        creatorId: { type: ObjectId, req: 'Profile', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)

GalaxySchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})