// const {
//   saveUser,
//   updateUser,
//   updateUserLoggedIn,
//   getUser,
//   getUserLogins,
// } = require("../models/user");
// // const { saveLeave } = require("../models/leave");
// // const asyncErrorHandler = require("../errorHandler/asyncErrorHandler");
// const saveUserInfo = asyncErrorHandler(async (req, res) => {
//   let data = req.body;
//   console.log(data.name);
//   if (data.name != undefined && data.age != undefined) {
//     await saveUser(data);
//     res.status(200).json({ success: true, data: "user added" });
//   } else {
//     res.json({ success: false, message: "name or age in missing" });
//   }
// });
// const markLogin = asyncErrorHandler(async (req, res, next) => {
//   let data = req.body;

//   console.log(data);
//   if (
//     data.date != undefined &&
//     data.time != undefined &&
//     data.sign_in_location != undefined
//   ) {
//     let response = await updateUserLoggedIn(data);
//     res.status(200).json(response);
//   } else {
//     res.json({ success: false, message: "some required data is missing" });
//   }
// });
// const addUserInfo = asyncErrorHandler(async (req, res) => {
//   let data = req.body;

//   console.log(data);
//   if (data.user_info !== undefined) {
//     let response = await updateUser(data);
//     res.status(200).json({ success: true, data: response.data });
//   } else {
//     res.json({ success: false, message: "required data is missing" });
//   }
// });

// const getUserInfo = asyncErrorHandler(async (req, res, next) => {
//   if (userId !== undefined) {
//     let response = await getUser(userId);
//     res.status(200).json(response);
//   } else {
//     res.status(400).json({ success: false, message: "userId not found" });
//   }
// });
// const getLoginInfo = asyncErrorHandler(async (req, res) => {
//   let userId = global.userId;
//   console.log(userId);
//   if (userId != undefined) {
//     let response = await getUserLogins(userId);
//     res.status(200).json(response);
//   } else {
//     res.json({ success: false, message: "user token error" });
//   }
// });

// const applyLeave = asyncErrorHandler(async (req, res) => {
//   let data = req.body;
//   let userId = global.userId;

//   console.log(data);
//   if (
//     userId != undefined &&
//     data.to != undefined &&
//     data.from != undefined &&
//     data.reason != undefined
//   ) {
//     let response = await saveLeave(data);
//     if (response.success) {
//       return res.status(200).json({ success: true, data: response.data });
//     } else {
//       return res
//         .status(200)
//         .json({ success: false, message: response.message });
//     }
//   } else {
//     res.json({ success: false, message: "required data is missing" });
//   }
// });
// const uploadImage = async (req, res) => {
//   let data = req.file;
//   console.log(data);
//   return res.json({ data });
// };

// module.exports = {
//   saveUserInfo,
//   markLogin,
//   addUserInfo,
//   getUserInfo,
//   getLoginInfo,
//   applyLeave,
//   uploadImage,
// };
