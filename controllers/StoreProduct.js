const StoreProduct = require('../models/StoreProduct');

exports.GetAllSProduct = (req,res)=>{
    StoreProduct.find({shopId: req.auth.shopId})
        .then(data=>{res.status(200).json({data})})
    .catch(err=>{res.status(500).json({error:err.message})})
}

exports.GetSProduct = (req,res)=>{
    StoreProduct.findOne({shopId: req.auth.shopId, _id: req.params.id})
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