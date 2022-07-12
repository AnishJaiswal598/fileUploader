import User from '../Model/userModel.js'

// Signup User
const signupUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    const findUserName = await User.findOne({ userName: req.body.userName });
    if (findUser) {
      res.status(409).json({
        success: false,
        messsage: 'Email already exists,try signing In!',
      });
    } else if (findUserName) {
      res.status(409).json({
        success: false,
        messsage: 'UserName already Taken',
      });
    } else {
      const user = new User({ ...req.body });
      const token = await user.generateAuthToken();
      await user.save();
      res.status(200).json({
        success: true,
        userDetails:user,
        data: token,
        message: 'User successfully registered',
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).json({
      success: true,
      userDetails:user,
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Logout User
const logoutUser = async (req, res) => {
  try {
    req.tokens === '';
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Show user Profile
const showUser = async (req, res) => {
  try {
    const user = await req.user;
    res.status(200).json({
      success: true,
      data: user,
    });
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// Update User
const updateUser = async (req, res) => {
    try {
      console.log(req.user._id);
      const user = User.findById(req.user._id);
      // console.log(user);
      const updateData = {
        ...req.body,
        password: req.body.password
          ? await bcrypt.hash(req.body.password, 8)
          : req.body.password,
      };
      const found = await User.updateOne(
        user,
        { $set: updateData },
        { omitUndefined: 1 }
      );
      if (!found) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'User updated sucessfully',
          updateData,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      console.log(error);
    }
  };

// Delete User
const deleteUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Please login',
      });
    }
    await req.user.remove();
    console.log("okay");
    res.status(204).json({
      success: true,
      data: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  signupUser,
  loginUser,
  logoutUser,
  showUser,
  updateUser,
  deleteUser,
  getUsers
}