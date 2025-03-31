import User from "../models/User.mjs";

export const findUser = async (req, res) => {
    try {
        // Check if req.user exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: Missing user ID" });
        }

        // Fetch user from database
        const user = await User.findById(req.user.id).select("username"); // Only fetch username
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if user is Admin
        if (user.username === 'Admin') {
            return res.status(200).json({ access: true });
        } else {
            return res.status(403).json({ access: false, message: "Access denied: User is not an admin" });
        }

    } catch (error) {
        console.error("Error finding user:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};