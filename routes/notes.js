const express=require('express')
const notes=require('../models/Notes')
const router=express.Router()
const {body,validationResult}=require('express-validator')
const fetchuser=require("../middleware/fetchuser")


//ROUTE 1: Fetching All notes using: GET "/api/detail/fetchallnotes" Login required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
  
    

   try{

       const Notes= await notes.find({user:req.user.id});
       
         
    res.json(Notes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    } 
    
})


//ROUTE 2: Adding a new Note using: POST "/api/detail/addnote" Login required
router.post('/addnote',fetchuser,[

    body('title',"Title must be 3 charater").isLength({min:3}),
   body('description',"Description must be 7 charater atleast").isLength({min:7})

], async(req,res)=>{
  
    const error=validationResult(req); 
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

   try{
 
       
       const {title,description,tag}=req.body;
        // const Note=new notes({
        //     user:req.user.id,
        //    title,description,tag
          
        // })   
        // const savedNote=await Note.save()
    const savedNote=await notes.create({
        title,description,tag,user:req.user.id
    })

    res.json(savedNote)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    } 
    
})
//ROUTE 3: Updating an Existing Note using: PUT "/api/detail/updatenote/:id" Login required
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
  

    try{

        const {title,description,tag}=req.body;
        
        //Create a newNote object
        const newNote={};
    if(title){
        newNote.title=title
    }
    if(description){
        newNote.description=description
    }
    if(tag){
        newNote.tag=tag
    }

    //Find the note to be updated and update it
    let Note= await notes.findById(req.params.id)
    if(!Note){
        return res.status(404).send("Not Found"); 
    }
    if(Note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }
    
    Note=await notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(Note) 
     
}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    } 
    
})


//ROUTE 4: Deleting an Existing Note using: DELETE "/api/detail/deletenote/:id" Login required
router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
  

    try{

       

    //Find the note to be delete and delete it
    let Note= await notes.findById(req.params.id)
    if(!Note){
        return res.status(404).send("Not Found"); 
    }

 // Allow deletion only if user owns this note
    if(Note.user.toString()!=req.user.id)
    {
        return res.status(401).send("Not Allowed");
    }
    
    Note=await notes.findByIdAndDelete(req.params.id)
    res.json({success:"Note has been deleted",Note:Note})
     
}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    } 
    
})



module.exports=router