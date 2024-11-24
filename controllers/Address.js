const Address = require('models/Address')


exports.GetAllAddress = (req, res, next) =>{
    Address.find()
        .then((addresss) => res.status(400).json(addresss))
        .catch((err)=> res.status(500).json(err))
}

exports.GetAddress = (req, res, next) =>{
    Address.find({_id: req.params._id})
        .then((result) => res.status(200).json(result))
        .catch((err)=> res.status(500).json(err))
}

exports.CreateAddress = (req, res, next) =>{
    const {street_Number,
        street,
        city,
        state,
        country,
        countryCode} = req.body

    const newAddress = new Address({
        street_Number,
        street,
        city,
        state,
        country,
        countryCode
    });
    newAddress.save()
        .then(()=> res.status(200).json({message: "Address create successfully"}))
        .catch((err) => {res.status(400).json(err)})
}

exports.UpdateAddress = (req, res, next) =>{
    Address.findOneAndUpdate({_id:req.params.id})
        .then(()=>res.status())
}

exports.DeleteAddress = (req, res, next) =>{

}