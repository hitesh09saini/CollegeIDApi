const AppError = require('../utils/error.utils')
const Student = require('../models/Student.models')
const { cloudinaryURl, deleteCloudinaryUrl } = require('../utils/cloudinary.utils')
const sendEmail = require('../utils/mail.utils')
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const College = require('../models/college.models');
const User = require('../models/user.models');
const createMessage = require('../messages/studentCreateId.message');

// register user
const register = asyncHandler(async (req, res, next) => {
    const {
        branch,
        semester,
        bio,
        goal,
        links,
        relationship,
        style,
    } = req.body;

    if (!branch || !semester || !relationship) {
        throw next(new AppError('All fields are required', 400));
    }
    const result = await cloudinaryURl(req.file.path);

    const _id = req.params.id;
    const college = await College.findById(_id);

    if (!college) {
        return next(new AppError('College not exists!', 400))
    }
    const user = await User.findById(req.user._id);

    const colleges = {
        _id,
        branch,
        semester,
    }
    const student = new Student({
        name: user.name,
        username: user.username,
        colleges,
        bio,
        goal,
        links,
        relationship,
        style,
        avatar: {
            public_id: result.public_id,
            secure_url: result.secure_url,
        },
    });
    await student.save();

    college.students.push(student._id);
    await college.save();

    user.collegeIds.push(student._id);
    await user.save();


    const email = req.user.email;

    const subject = `You have successfully created your StudentId`;

    const message = createMessage(user.username, branch, semester, college.logo.secure_url)
    try {
        await sendEmail(email, subject, message);
    } catch (error) {
        return next(new AppError('Error sending email', 500));
    }


    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        student,
    });
});

// updateProfile
const updateProfile = asyncHandler(async (req, res, next) => {
    const {
        bio,
        goal,
        links,  // Array
        relationship,
        style,
    } = req.body;

    const user = req.user;
    // Validate if req.params.id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new AppError('Invalid ID format', 400));
    }


    if (!user.collegeIds.includes(req.params.id)) {
        return next(new AppError('You cannot edit this profile', 403));
    }
    const student = await Student.findById(req.params.id);

    if (bio) {
        student.bio = bio;
    }
    if (goal) {
        student.goal = goal;
    }

    if (Array.isArray(links)) {
        student.links = links;
    } else if (links) {
        // Handle the case where links is not an array (optional)
        return next(new AppError('Links should be an array', 400));
    }

    if (relationship) {
        student.relationship = relationship;
    }

    student.style = style;

    // check file
    if (req.file) {
        try {
            // remove file from cloudinary
            await deleteCloudinaryUrl(student.avatar.public_id);
            // upload on cloudinary
            const result = await cloudinaryURl(req.file.path);
            student.avatar.public_id = result.public_id;
            student.avatar.secure_url = result.secure_url;
        } catch (error) {
            // Handle errors during file upload
            return next(new AppError('Error uploading file to Cloudinary', 500));
        }
    }

    await student.save();

    res.status(200).json({
        success: true,
        message: 'Profile updated!',
        student,
    });
});


// update following
const updateFollowing = asyncHandler(async (req, res, next) => {
    const myId = req.params.myId;  // My id
    const { followingId } = req.body;  // Follower id

    const me = await Student.findById(myId);  // Me
    const user = await Student.findById(followingId);

    if (!me || !user) {
        throw next(new AppError('User not found', 404));
    }

    // Check if the user is not already in the following list
    if (!me.following.includes(followingId)) {
        me.following.push(followingId);
        await me.save();  // Save changes to 'me'

        user.follower.push(myId);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Following updated successfully',
            user: me,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Already following this user',
        });
    }
});

// get profile
const getProfile = asyncHandler(async (req, res, next) => {
    const user = await Student.findById(req.body.id);

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    const followerIds = user.follower;
    const followingIds = user.following;

    try {
        // Fetch followers and following in a single query
        const [followers, following] = await Promise.all([
            Student.find({ _id: { $in: followerIds } }),
            Student.find({ _id: { $in: followingIds } }),
        ]);

        res.status(200).json({
            success: true,
            message: 'User details',
            data: {
                followers,
                following,
            },
        });
    } catch (error) {
        // Handle errors if any of the queries fail
        return next(new AppError('Error fetching user details', 500));
    }
});


// get all students
const getAll = asyncHandler(async (req, res, next) => {
    const college = await College.findById(req.params.id);
    if (!college) {
        return next(new AppError('College not found', 404));
    }
    const studentIds = college.students;

    if (studentIds.length > 0) {
        const students = await Student.find({ _id: { $in: studentIds } });
        if (!students) {
            return next(new AppError('Error fetching student details', 500));
        }

        res.status(200).json({
            success: true,
            message: 'Student details',
            data: students,
        });
    } else {
        res.status(200).json({
            success: true,
            message: 'No students found for the college',
            data: [],
        });
    }
});


module.exports = {
    register,
    updateProfile,
    updateFollowing,
    getProfile,
    getAll,
}

