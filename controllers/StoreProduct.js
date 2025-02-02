const StoreProduct = require('../models/StoreProduct');
const mongoose = require('mongoose');

exports.GetAllSProduct = async (req,res)=>{
    const limit = req.query.lmt ? req.query.lmt : 0;
    StoreProduct.find().limit(limit).populate({
        path: 'productSKU', // Nom du champ à peupler
        model: 'Product',   // Nom du modèle à lier
        localField: 'productSKU', // Champ dans StorePSchema
        foreignField: 'SKU',      // Champ dans ProductSchema
    })
        .then(products => res.status(200).json(products))
    .catch(error => res.status(500).json(error));
}

exports.GetSProduct = (req,res)=>{
    StoreProduct.findOne({shopId: req.auth.shopId, _id: req.params.id}).populate({
        path: 'productSKU', // Nom du champ à peupler
        model: 'Product',   // Nom du modèle à lier
        localField: 'productSKU', // Champ dans StorePSchema
        foreignField: 'SKU',      // Champ dans ProductSchema
    })
        .then(data=>{res.status(200).json({data})})
        .catch(err=>{res.status(500).json({error:err.message})})
}

exports.CreateSProduct = (req,res)=>{
    const {slot, current_stock, reorder_level, productSKU} = req.body;
    const newSProduct = new StoreProduct({
        slot: slot,
        current_stock: current_stock,
        productSKU: productSKU,
        reorder_level: reorder_level,
        shopId: req.auth.shopId,
    });
    newSProduct.save()
    .then(()=>res.status(200).json({message: 'Succesfully created'}))
    .catch(err=>{res.status(500).json({error:err.message})})
}

exports.UpdateSProduct = (req,res)=>{
    StoreProduct.findByIdAndUpdate({_id : req.params.id,
    shopId: req.auth.shopId,}, {_id: req.params.id, ...req.body})
        .then(data=>{res.status(200).json({message: 'Succesfully updated'})})
    .catch(err=>{res.status(500).json({error:err.message})})
}

exports.DeleteSProduct = (req,res)=>{
    StoreProduct.findByIdAndDelete({_id : req.params.id, shopId: req.auth.shopId})
    .then(data=>{res.status(200).json({message: 'Succesfully deleted'})})
    .catch(err=>{res.status(500).json({error:err.message})})
}