const express = require('express');
const Session = require('../models/Session');
const routes = express.Router();

// register API
routes.post('/register' , async (req , res) => {
    try{
        const { name } = req.body
        const c = await Session.findOne({name:name});
        if(c){
            return res.json({"msg":"Session Already Exists"})
        }
        const clg = await new Session({
            name:name,
            status:"active"
        });
        clg.save();
        return res.json({"msg":"Session Registered"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"Server Error"})
        
    }
})


routes.get('/show' , async (req , res) => {
    try{
        const a = await Session.find({status:["active" , "inactive"]});
        return res.json({"msg":"Data fetched","Session":a})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"server error"})
        
    }
})


routes.put('/:id', async (req , res) => {
    try{
        const {id} = req.params;
        const { name } = req.body;
        await Session.findByIdAndUpdate(id, {name : name })
        return res.json({"msg":"Session Updated"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"server error"})
        
}
})  

routes.delete('/:id' , async (req , res) => {
    try{
        const {id} = req.params;
        const data = await Session.findByIdAndUpdate(id,{status:"delete"})
        return res.json({"msg":"Session deleted successfully"})
    }
    catch(er){
        console.error(er);
        return res.json({"msg":"deleted error"})
        
    }
})

routes.get('/active',async(req,res) => {
    try{
        const data = await Session.find({status:"active"})
        return res.json({"msg":"Session fetched" , "Session":data})
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