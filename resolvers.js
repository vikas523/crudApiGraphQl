const Post=require('./models/postmodel')

const resolvers ={
    Query:{
        hello:()=>{
            return `hello apollo server`
        },

        getAllPost:async()=>{
            const post = await Post.find()
            return post
        },
        getPost:async(parent,{id},context,info)=>{
            return await Post.findById(id)

        }
    },

    Mutation:{
        createPost:async(parent,args,context,info)=>{
            const{title,description}=args.post;
            const post = new Post({title,description})
            await post.save();
            return post
        },
        deletePost:async(parent,args,context,info)=>{
            const {id} = args
            await Post.findByIdAndDelete(id)
            return 'ok deleted succefuly'
        },
        updatePost:async(parent,args,context,info)=>{
            const {id}=args;
            const{title,description}=args.post
            const post = await Post.findByIdAndUpdate(id,{title,description},{new:true})
            return Post

        }
    }
};

module.exports=resolvers