import mongoose, { MongooseError } from 'mongoose';

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() { return new mongoose.Types.ObjectId(); }
  }
});

const dealsPizzaSchema = new mongoose.Schema({
  pizzaId: {
    type:mongoose.Schema.Types.ObjectId,
  }
})

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
    },
    banner: {
      type: String,
      required: [true, "Banner Image Required"],
    },
    sizes: {
      type: [sizeSchema],
      required: true,
    },
    chooseItems: {
      pizzas: {
        type: Number,
        default: 0,
      },
      dips: {
        type: Number,
        default: 0,
      },
      drinks: {
        type: Number,
        default: 0,
      },
      desserts: {
        type: Number,
        default: 0,
      },
    },
    defaultItems: {
      type: [String],
      default: [],
    },
    defaultDrinkType: {
      type: String,
      required: [true, "Default Drink Type is required"],
      default: "can",
    },
    isPopular: {
      type: Boolean,
      default: true,
    },
    pizzaData: {               //this field holds notIncludedPizza list
      type: [{type:mongoose.Types.ObjectId,ref:"pizzas"}],  
    },
  },
  { timestamps: true }
);

export default mongoose.model("deals", dealSchema, "deals");
