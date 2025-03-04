let {OkResponse ,BadRequestResponse } =  require('express-http-response');

const {  validationResult } = require('express-validator');
let mongoose = require('mongoose');
let User = mongoose.model('User');
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         next( new BadRequestResponse("Missing required parameter.", 422.0))
    }else {
        next();
    }
}
const isUpdateEmailExist = (req, res, next) => {
    if(req.user && req.user.email !== req.body.user.email) {
        User.count({ '$and': [ { email: req.body.user.email } ] }, (err ,count) => {
            if(err) {
                next(new InternalServerErrorResponse ())
            }  
            else if(count > 0) {
               next(new BadRequestResponse('E-mail already exist.',422.1));
             } else {
                 next();
             }
    
         })
    } else {
        next();
    }
}
const isUpdateUsernameExist = (req, res, next) => {
    if (req.user && req.user.username.toLowerCase() !== req.body.user.username.toLowerCase()) {

        User.count({ username: { $regex: new RegExp(req.body.user.username, "i") }}, (err ,count) => {
        if(err) {
            next(new InternalServerErrorResponse())
        }  
        else if(count > 0) {
           next(new BadRequestResponse('Username already exist.',422.2));
         } else {
             next();
         }
     })
    } else {
        next();
    }  
}

const isEmailExist = (req, res, next) => {
    User.count({ '$and': [ { email: req.body.user.email } ] }, (err ,count) => {
        if(err) {
            next(new InternalServerErrorResponse ())
        }  
        else if(count > 0) {
           next(new BadRequestResponse('E-mail already exist.',422.1));
         } else {
             next();
         }

     })
  
}
const isUsernameExist = (req, res, next) => {
    User.count({ username: { $regex: new RegExp(req.body.user.username, "i") } }, (err ,count) => {
        if(err) {
            next(new InternalServerErrorResponse ())
        }  
        else if(count > 0) {
           next(new BadRequestResponse('Username already exist.',422.2));
         } else {
             next();
         }

     })
    
}
const isPhoneExist = (req, res, next) => {
     
    User.count({ '$and': [ { phone: req.body.user.phone } ] }, (err ,count) => {
        if(err) {
            next(new InternalServerErrorResponse ())
        }  
        else if(count > 0) {
           next(new BadRequestResponse('Phone already exist.',422.3));
         } else {
             next();
         }

     })
}


module.exports = {validate, isEmailExist, isUsernameExist, isPhoneExist, isUpdateEmailExist, isUpdateUsernameExist}