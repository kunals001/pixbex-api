import Hire from "../models/hire.model.js";

export const SendHire = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      description,
      referenceWebsite,
      pages,
      deadline,
      budget,
      preferredCommunication,
      message,
    } = req.body;

    
    if (!name || !email || !projectType || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    
    const newHire = new Hire({
      name,
      email,
      phone,
      projectType,
      description,
      referenceWebsite,
      pages,
      deadline,
      budget,
      preferredCommunication,
      message,
    });

   
    const savedHire = await newHire.save();

    res.status(201).json({
      success: true,
      message: "Hire request submitted successfully.",
      hire: savedHire,
    });

  } catch (error) {
    console.error("Hire Request Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const GetHire = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if(!user.isAdmin){
        return res.status(400).json({success: false, message: "User not found" });
    }
    
    const hires = await Hire.find();
    res.status(200).json({ success: true, hires });
  } catch (error) {
    console.error("Get Hires Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const DeleteHire = async(req,res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if(!user.isAdmin){
        return res.status(400).json({success: false, message: "User not found" });
    }
    const hire = await Hire.findByIdAndDelete(req.params.id);
    
    res.status(200).json({success: true, message: "Hire deleted successfully",hire });

  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error.message });
  }
}