const express = require('express');
const College = require('../models/College');
const routes = express.Router();


// register API
routes.post('/register' , async (req , res) => {
    try{
        const { name , description } = req.body
        if(!name || !description){
            return res.json({"msg":"all fields are mandatory"})
        }
        const c = await College.findOne({name:name});
        if(c){
            return res.json({"msg":"College Already Exists"})
        }
        const clg = await new College({
            name:name,
            description:description,
            status:"active"
        });
        clg.save();
        return res.json({"msg":"College Registered"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"Server Error"})
        
    }
})


routes.get('/show' , async (req , res) => {
    try{
        const a = await College.find({status:["active" , "inactive"]});
        return res.json({"msg":"Data fetched","college":a})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"server error"})
        
    }
})


routes.put('/:id', async (req , res) => {
    try{
        const {id} = req.params;
        const { name , description } = req.body;
        await College.findByIdAndUpdate(id, {name : name , description : description })
        return res.json({"msg":"College Updated"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"server error"})
        
}
})  

routes.delete('/:id' , async (req , res) => {
    try{
        const {id} = req.params;
        const data = await College.findByIdAndUpdate(id,{status:"delete"})
        return res.json({"msg":"college deleted successfully"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"deleted error"})
        
    }
})


routes.get('/active',async(req,res) => {
    try{
        const data = await College.find({status:"active"})
        return res.json({"msg":"college fetched" , "college":data})
    }catch(er){
        console.error(er);
        return res.json({"msg":"server error"})

    }
})


// block/unblock

routes.patch('/:id' , async (req , res) => {
    try{
        const {id} = req.params
        const {status} = req.body
        await College.findByIdAndUpdate(id,{status:status})
        return res.json({"msg":"status updated"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"server error"})        
    }
})
module.exports = routes;