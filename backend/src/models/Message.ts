import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    role: string;
}

const MessageSchema: Schema = new Schema({
    content: {type:String, required:true},
    role: {type:String, required:true},
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;