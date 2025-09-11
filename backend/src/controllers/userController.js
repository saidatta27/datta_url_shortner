import { User } from "../models/user/user.model";

export const getUserProfile = async (req, res) => {
    try {
        // Assuming user info is stored in req.user after authentication middleware
        const userid=req.user.id;

        const presentUser=await User.findById(userid);

        return res.status(200).json({ data: "Mani" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};