const router = require ("express").Router();
const Listing = require("../models/Listing");
const verify = require("./verifyToken");

//Add New Listing
router.post("/",verify,async (req,res)=>{
  const listing = new Listing({
    title: req.body.title,
    price: req.body.price,
    locality : req.body.locality,
    details : req.body.details
  });
  try {
    const saveListing =await listing.save();
    res.send(saveListing);
  } catch (error) {
    res.status(400).send(error);
  }
})

// Get All Listing
router.get("/", async (req,res)=>{
  try {
    const listing =await Listing.find();
    res.json(listing);
  } catch (error) {
    res.json({message : error});
  }
})

// Sigle Listing
router.get("/:listingId",async (req,res)=>{
  try {
    const listing =await Listing.findById(req.params.listingId);
    res.json(listing);
  } catch (error) {
    res.json({message : error});
  }
})

// Update Listing
router.put("/:listingId",verify,async (req,res)=>{
  try {
    const listing = {
      title: req.body.title,
      price: req.body.price,
      locality : req.body.locality,
      details : req.body.details
    };
    const updateListing =await Listing.findByIdAndUpdate({_id:req.params.listingId}, listing);
    res.json(updateListing);

  } catch (error) {
    res.json({message : error});
  }
})

// Delete Listing
router.delete("/:listingId",verify,async(req,res)=>{
  try {
    const deleteListing = await Listing.findByIdAndDelete({_id:req.params.listingId});
    res.json(deleteListing);
  } catch (error) {
    res.json({message : error});
  }
})

module.exports = router;
