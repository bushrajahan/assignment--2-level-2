import { model, Schema } from "mongoose";
import { Order } from "./order/order.interface";

const OrderSchema = new Schema<Order>({

  email:{
    type:String,
    required:true
  },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }

})

export const OrderModel = model<Order>('order',OrderSchema)