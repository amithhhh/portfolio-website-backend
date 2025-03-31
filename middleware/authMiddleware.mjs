import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Not Authenticated - No Token Found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        res.status(403).json({ error: "Forbidden: Invalid Token" });
    }
};

export default authMiddleware;