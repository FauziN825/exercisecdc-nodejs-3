import { Request, Response, NextFunction } from "express";
import  mongoose  from "mongoose";
import logging from "../config/logging";
import Contact from "../models/contact";


const NAMESPACE = 'Sample Controller'

const createContacts = (req: Request, res: Response, next: NextFunction) => {
    let {fullName, phoneNumber, address} = req.body;

    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        phoneNumber,
        address
    })

    return contact.save()
    .then(result => {
        return res.status(201).json({
            contact: result
        });
    })
    .catch(error => {
        return res.status(500).json({
            message: error.messasge,
            error
        })
    })

    
}


const getAllContacts = (req: Request, res: Response, next: NextFunction) => {
    Contact.find()
    .exec()
    .then(results => {
        return res.status(200).json({
            contacts: results,
            count: results.length
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.messasge,
            error
        })
    })
    
    // logging.info(NAMESPACE, `Sample healt check route called, `);
    // return res.status(200).json({
    //     messasge: 'pong'
    // })
}

export default {getAllContacts, createContacts}