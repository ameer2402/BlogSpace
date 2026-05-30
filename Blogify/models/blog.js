const{Schema,model}=require("mongoose");

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    category:{
       type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }

},{timestamps:true, toJSON: { virtuals: true }, toObject: { virtuals: true }});

// Virtual property for reading time (estimated at 200 words per minute)
blogSchema.virtual('readingTime').get(function() {
    const wordsPerMinute = 200;
    const cleanBody = this.body ? this.body.replace(/<[^>]*>/g, '') : '';
    const words = cleanBody.split(/\s+/).filter(w => w.length > 0).length;
    return Math.ceil(words / wordsPerMinute);
});

// Text index for optimized searching across title, body, and category
blogSchema.index({ title: 'text', body: 'text', category: 'text' });

const Blog=model("blog",blogSchema);
module.exports=Blog;