// import { User } from "../models/user/user.model.js";

// export const getUserProfile = async (req, res) => {
//     try {
//         // Assuming user info is stored in req.user after authentication middleware
//         const userid=req.user.id;

//         const presentUser=await User.findById(userid);

//         return res.status(200).json({ data: "Mani" });

//     } catch (error) {
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };


import { User } from "../models/user/user.model.js"; // Adjust path as needed


/**
* Get details of the authenticated user.
* GET /api/user/me
*/
export const getUserDetails = async (req, res) => {
 try {
   const userId = req.user?.id; // Get userId from the authenticated request


   if (!userId) {
     return res.status(401).json({ message: "User not authenticated." });
   }


   const user = await User.findById(userId).select("-password"); // Exclude password from response


   if (!user) {
     return res.status(404).json({ message: "User not found." });
   }


   res.status(200).json(user);
 } catch (error) {
   console.error("Error fetching user details:", error);
   res.status(500).json({ message: "Server error", error: error.message });
 }
};

