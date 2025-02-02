const Role = require('../models/Role')

exports.GetAllRoles = (req, res) => {
    Role.find({shopId: req.auth.shopId})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>res.status(500).json(err))
}

exports.GetRole = (req, res) => {
    Role.findOne({shopId: req.auth.shopId, _id: req.params.id})
        .then((result)=> res.status(200).json(result))
        .catch((err)=> res.status(500).json(err))
}

exports.CreateRole = (req, res) => {
    const {name, permissions} = req.body;
    console.log("Permissions:", JSON.stringify(permissions, null, 2));

    const newRole = new Role({
        name,
        permissions,
        shopId: req.auth.shopId
    });
    newRole.save()
        .then(()=> res.status(200).json({message: 'Role create succesfully'}))
        .catch((err)=> res.status(400).json(err))
}

exports.UpdateRole = (req, res) => {
    Role.findOneAndUpdate({shopId: req.auth.shopId, _id: req.params.id}, {...req.body})
        .then(()=>res.status(200).json({message: 'Role updated succesfully'}))
        .catch((err)=>res.status(400).json(err))
}

exports.DeleteRole = (req, res) => {
    Role.findOneAndDelete({shopId: req.auth.shopId, _id: req.params.id})
        .then(()=>res.status(200).json({message: "Role deleted successfully"}))
        .catch((err)=>res.status(400).json(err))
}