import { Request, Response, NextFunction } from "express";
import  mongoose  from "mongoose";
import logging from "../config/logging";
import Contact from "../models/contact";


const NAMESPACE = 'Sample Controller'

const createContacts = async (req: Request, res: Response, next: NextFunction) => {
    let {fullName, phoneNumber, address} = req.body;

    const contact = await new Contact({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        phoneNumber,
        address
    })

    return await contact.save()
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


const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
    await Contact.find()
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

const getContactById = async (req: Request, res: Response, next: NextFunction) => {
   const contact = await Contact.findById(req.params.id)

   try {
        if(!contact) {
            return res.status(400).json({
                    message: "User Not Found"
                })
        } 
        else {
                res.status(200).send({"Message" : "Data Contact by Id", "user": contact})
        }
   } catch (err: any) {
       res.status(500).send(err.message)
   }   
}


const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if(!contact) {
            return res.status(400).json({
                message: "User Not Found"
            })
        } else {
            Contact.findByIdAndRemove(req.params.id).then((found) => {
                res.status(200).send({"Message" : "Succesfully Deleted", "user": found})
            })
        }
    } catch (err: any) {
         res.status(500).send(err.message)
    }    
} 


async function sortedDataByName(req: Request, res: Response){
    try {
        const contacts = await Contact.find({}, function(err, result) {
            if (err) {
                    console.log(err);
            } else {
                    res.json(result);
            }
        })
        .sort({ fullName: 1 });
        if(!contacts){
            return res.status(400).json({
                    message: "User Not Found"
            })
        }
        res.status(200).send({"Message" : "Data Contact by Id", "user": contacts})
        
    } catch (err) {
        console.log(err);
    }
}

async function sortedDataByAddress(req: Request, res: Response){
    try {
        const contacts = await Contact.find({}, function(err, result) {
            if (err) {
                    console.log(err);
            } else {
                    res.json(result);
            }
        })
        .sort({ address: 1 });
        if(!contacts){
            return res.status(400).json({
                    message: "User Not Found"
            })
        }
        res.status(200).send({"Message" : "Data Contact by Id", "user": contacts})
        
    } catch (err) {
        console.log(err);
    }
}


const updateContactData = async (req: Request, res: Response) => {
    //get todo id
	const id = req.params.id;

	Contact.findByIdAndUpdate(id, req.body, {
		new: true,
	})
    .then((result) => {
        res.status(200).send({"Message" : "Succesfully Updated", "user": result})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};



export default {getAllContacts, createContacts, getContactById, deleteContact, updateContactData, sortedDataByName, sortedDataByAddress}