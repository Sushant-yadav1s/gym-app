const Membership = require('../Modals/membership');

exports.addMembership = async (req, res) => {
  try {
    const { months, price } = req.body;

    // Check if membership already exists
    const memberShip = await Membership.findOne({ gym: req.gym._id, months });

    if (memberShip) {
      // Update price and save the existing document
      memberShip.price = price;
      await memberShip.save();  // Fixed this line
      return res.status(200).json({ message: 'Updated Successfully' });
    } else {
      // Create and save new membership
      const newMembership = new Membership({ price, months, gym: req.gym._id });
      await newMembership.save();
      return res.status(200).json({ message: 'Added Successfully' });  // Fixed the message
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
exports.getmembership=async(req,res)=>{
    try{
      const loggedInId=req.gym._id;
      const memberShip=await Membership.find({gym:loggedInId});
      res.status(200).json({
        message:"Membership Fetched Successfully",
        membership:memberShip
      })
    }
    catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
}