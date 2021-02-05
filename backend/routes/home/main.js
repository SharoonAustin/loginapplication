const express=require('express');
const router=express.Router();
const bycrypt=require('bcryptjs');
const User=require('../../models/login');

router.post('/login',(request, response)=> {
    const email=request.body.email.toLowerCase();
    const password=request.body.password.toLowerCase();

    User.findOne({email:email}).then((user)=>{
        if(user){
            bycrypt.compare(password, user.password,(err,matched)=>{
                if (err) return err;
                if(matched && user.isadmin==true){
                    return User.find({}).then(data=>{
                        return response.json({Message:data,status:401});
                    })
                }
                else if(matched){
                    return User.findOne({_id:user._id}).then(data=>{
                        return response.json({Message:data, status:400});
                    });
                }
                
                else if(!matched){
                        return response.json({Message:"Incorrect Email/Password", status:200});
                }

            })
        }
        else{
            return response.json({Message:"Contact admin to register you"});
        }
    })
})

router.post('/register',(request, response)=> {
    User.findOne({email: request.body.email}).then(user=>{
        if(user){
            if (user.email===request.body.email) {
                return response.json({status:200});
              }
        }
        else{
            const newUser=new User();
            newUser.firstname=request.body.firstname.toLowerCase();
            newUser.email=request.body.email.toLowerCase();
            newUser.password=request.body.password.toLowerCase();

            bycrypt.genSalt(10,(err,salt)=>{
                bycrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) return err;
                    newUser.password=hash
                    newUser.save().then(savedUser=>{
                        response.send('Congratulations you are registered')
                    })
                    .catch(err =>{});
                })
            })
            return response.json({status:400});
        }
    })
   
})

router.get('/getData',(request,response)=>{
    User.find({}).then(data=>{
         response.json(data);
    })
})

router.get('/getData/:id',(request,response)=>{
    User.findOne({_id:request.params.id}).then(data=>{
        response.json(data);
   })
})

module.exports=router