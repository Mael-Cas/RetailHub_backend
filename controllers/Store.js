const Store = require('../models/Store')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Address = require('../models/Address')

exports.GetAllStore = (req, res) =>{
    Store.find()
        .populate([
            {path: 'address'},
            {path: 'managerId'},
        ])
        .then((store)=>{res.status(200).json(store)})
    .catch((err)=>{res.status(500).json(err)})
}

exports.GetStore = (req, res) => {
    Store.findOne({_id : req.params.id})
        .populate([
            {path: 'address'},
            {path: 'managerId'},
        ])
        .then((store)=>{res.status(200).json(store)})
        .catch((err)=>{res.status(500).json(err)})
}

exports.CreateStore = async (req, res) => {
    try {
        const {street_Number, street, city, state, country, countryCode} = req.body;
        const {license_Number, phone, email} = req.body;

        const newUser = new User({
            name : "manager",
            email : email,
            password: bcrypt.hashSync("Admin-123", 10),
            shopId:"1",
            role : "*",
        })
        await newUser.save()

        const newAddress = new Address({
            street_Number,
            street,
            city,
            state,
            country,
            countryCode,
        });
        await newAddress.save()

        const newStore = new Store({
            address: newAddress._id,
            license_Number,
            phone,
            email,
            managerId: newUser._id
        })
        await newStore.save()

        await User.findOneAndUpdate({_id: newUser._id}, {shopId : newStore._id}, {new: true})

        res.status(201).json({message: 'Store successfully created'})
    }catch(err){
        res.status(500).json(err)
    }

}

exports.UpdateStore = (req, res) => {
    Store.findOneAndUpdate({_id : req.params.id}, {_id : req.params.id, ...req.body})
        .then((store)=>{res.status(200).json({message: 'Store successfully updated'})})
    .catch((err)=>{res.status(500).json(err)})
}

exports.DeleteStore = (req, res) => {
    Store.findByIdAndDelete({_id : req.params.id})
    .then((store)=>{res.status(200).json({message: 'Store successfully deleted'})})
    .catch((err)=>{res.status(500).json(err)})
}