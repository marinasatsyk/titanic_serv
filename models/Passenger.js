import mongoose, { model, Schema} from "mongoose";

export const PassengerSchema = new Schema({
    
    Name: {
        type: String,
        required: true
    },
    Survived: {
        type: Number,
        required: true
    },
    Pclass: {
        type: Number,
        required: true
    },
    Sex: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    SibSp: {
        type: Number,
        required: true
    },
    Parch: {
        type: Number,
        required: true
    },
    Ticket: {
        type: Schema.Types.Mixed,
        // type: String | Number, 
        required: true
    },
    Fare: {
        type: Number,
        required: true
    },
    Cabin: {
        type: String,
        required: true
    },
    Embarked: {
        type: String,
        required: true
    }
});

const PassengerModel = model('passengers', PassengerSchema);
export default PassengerModel;