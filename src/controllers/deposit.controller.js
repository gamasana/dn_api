const Deposit = require("../models/deposit.model");

exports.addDeposit = async (req, res) => {
  const { userId, amount, paymentMethod, proof } = req.body;

  const deposit = await new Deposit({
    userId,
    amount,
    paymentMethod,
    proof,
  }).save();

  if(deposit){
    res.status(200).json({message: "deposit successful"})
  }
  
};

exports.getAllDeposit = (req, res) => {
    Deposit.find({}).exec((error, data)=> {
        if(error){
            res.status(500).json({message:"Internal server error"})
        }
        if(data){
            res.status(200).json({
                data,
                message:"fetch succesful"
            })
        }
    })
};

exports.updateDepositStatus = async (req, res) => {
    const {id, status}= req.body
     Deposit.findByIdAndUpdate(id, {status: status}, ((error, deposit) => {
        if(error){
            res.status(500).json({message:"something went wrong"})
        }
        if(deposit){
            res.status(200).json({
              
                message: "updated successfully"
            })
        }
     }))

    
};
