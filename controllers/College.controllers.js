const AppError = require('../utils/error.utils')
const College = require('../models/college.models')
const { cloudinaryURl, deleteClodinaryUrl } = require('../utils/cloudinary.utils')

const asyncHandler = require("../middlewares/asyncHandler.middleware")

const register =   asyncHandler(  async(req, res, next)=>{
    const {name, location, branch} = req.body;
    // console.log(" name: " +name,"location: "+ location);

    if(!name|| !location){
        throw next(new AppError('All fields is required', 404));
    }

    if (!req.file) {
        return next(new AppError('File does not exist', 400));
    }
    
    const result =  await cloudinaryURl(req.file.path);
    
    const newCollege = new College({
        name, 
        location,
        logo: {
            public_id: result.public_id,
            secure_url: result.secure_url,
        },
        branch
    })

    await newCollege.save();

    res.status(200).json({
        success : true,
        message: 'College created successfully',
        newCollege,
    })
})

const addBranch = asyncHandler(async (req, res, next) => {
    const { branch } = req.body;
    const { id } = req.params; // Assuming 'id' is the name of your route parameter

    const college = await College.findById(id);

    if (!college) {
        return next(new AppError('College not exist', 400));
    }

    // Use push to add the new branches to the existing array
    college.branch.push(...branch);

    await college.save();

    res.status(201).json({
        success: true,
        message: 'Branch added successfully',
        data: college.branch,
    });
});

const getAll = asyncHandler(async (req, res, next) => {
    const colleges = await College.find();
    
    if (colleges.length === 0) {
        return next(new AppError('CollegeDB not exist', 400));
    }

    res.status(200).json({
        success: true,
        message: 'Colleges retrieved successfully',
        colleges,
    });
});

module.exports = {
    register,
    addBranch,
    getAll
}
