const userModel = require('../models/user.model');
const sessionModel = require('../models/session.model');
const otpModel = require('../models/otp.model');
const blacklistModel = require('../models/blacklist.model');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOtp, getOtpHtml } = require('../utils/util');
const sendEmail = require('../services/email.service');
const crypto = require('crypto');

/**
 * @route /api/auth/register
 * @description new user register on the app using username, email and password
 * @access Public
 */

const userRegisterController = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(401).json({
                message: "Please fill the fileds."
            });
        }

        const isAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isAlreadyExist) {
            return res.status(409).json({
                message: "User already exist with this email or username"
            })
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPass
        });

        const otp = generateOtp();
        const html = getOtpHtml(otp);

        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

        await otpModel.create({
            email,
            otpHash,
            user: user._id
        });

        await sendEmail(email, "Verify your NotesApp email", `Your NotesApp verification code is ${otp}`, html)

        const refreshToken = jwt.sign({
            id: user._id,
            username: user.username
        }, config.JWT_SECRET,
            { expiresIn: "7d" })


        const acceessToken = jwt.sign({
            id: user._id,
            username: user.username
        }, config.JWT_SECRET,
            {
                expiresIn: "15m"
            })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            message: "User register successfully.",
            acceessToken,
            user
        })
    }
    catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ message: "Something went wrong.", err });
    }

}

/**
 * @route /api/auth/login
 * @description user can login using username or email and password
 * @access Public
 */
const userLoginController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Please fill the fileds."
            });
        }

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        if (!user.isVerified) {
            const otp = generateOtp();
            const html = getOtpHtml(otp);

            const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

            await otpModel.create({
                email,
                otpHash,
                user: user._id
            });

            await sendEmail(email, "Verify your NotesApp email", `Your NotesApp verification code is ${otp}`, html)

            return res.status(200).json({
                message: "OTP has sent on your email.",
                user: {
                    id: user._id,
                    username: user.username,
                    isVerified: user.isVerified
                }
            });
        }

        const refreshToken = jwt.sign({
            id: user._id
        }, config.JWT_SECRET, {
            expiresIn: "7d"
        });

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id
        }, config.JWT_SECRET, {
            expiresIn: "15m"
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7days    
        });

        res.status(200).json({
            message: "User login successfully.",
            user: {
                id: user._id,
                username: user.username,
                isVerified: user.isVerified
            }, accessToken
        })

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

/**
 * @route /api/auth/verify-email
 * @description user verify their email by using sended code.
 * @access Public
 */
const verifyEmailController = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.status(400).json({
            message: "Please enter the OTP."
        })
    }

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpDoc = await otpModel.findOne({
        otpHash
    })

    if (!otpDoc) {
        return res.status(400).json({
            message: "Invalid OTP."
        });
    }

    const user = await userModel.findOneAndUpdate(otpDoc.user, {
        isVerified: true
    })

    await otpModel.deleteMany({
        user: otpDoc.user
    })

    return res.status(200).json({
        message: "Email verified successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.isVerified,
            resetPass: user.resetPass
        }
    })
}

/**
 * @decription Create a new short lived access token using refresh token cookie.
 * @access Public
 */
const refreshAccessTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token is not provided."
            });
        }

        const isBlackListed = await blacklistModel.findOne({
            token: refreshToken,
            type: "refresh"
        });

        if (isBlackListed) {
            return res.status(401).json({
                message: "Refresh token in invalid."
            });
        }

        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const accessToken = jwt.sign({
            id: user.id
        },
            config.JWT_SECRET,
            { expiresIn: "15m" }
        );

        return res.status(200.).json({
            message: "Access token is refreshed successfully.",
            accessToken
        });

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Invalid and expired refresh token."
        });

    }
}

/**
 * @route /api/auth/get-me
 * @description Get the current logged in user details.
 * @acess Private
 */
const getMeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not fetched."
            });
        }

        return res.status(200).json({
            message: "User fetched successfully.",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (err) {
        console.log("Get me error : ", err);
        return res.status(500).json({
            message: "Something went wrong."
        });
    }
}

/**
 * @route /api/auth/logout
 * @description logout from the current session.
 * @access Private
 */
const logoutController = async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null;

        const refreshToken = req.cookies.refreshToken;

        if (!accessToken) {
            return res.status(400).json({
                message: "Access token in not provided."
            });
        }
        else {
            await blacklistModel.create({
                token: accessToken,
                type: "access"
            });
        }

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token is not found."
            }); 1
        }
        else {
            await blacklistModel.create({
                token: refreshToken,
                type: "refresh"
            });
        }

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        });

        if (!session) {
            return res.status(400).json({
                message: "Refresh token is invalid."
            });
        }

        session.revoked = true;
        session.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out successfully."
        });

    }
    catch (err) {
        console.log("Give me error : ", err);
        return res.status(400).json({
            message: "Something went wrong."
        });
    }
}

/**
 * @route /api/auth/forgot-password
 * @description send otp to user email to reset password.
 * @access Public
 */
const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(401).json({
                message: "Please fill the email!"
            });
        }

        const user = await userModel.findOne({ email });
        user.resetPass = true;
        await user.save();

        if (!user) {
            return res.status(401).json({
                message: "User not found by this email!"
            });
        }

        const otp = generateOtp();
        const html = getOtpHtml(otp);

        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

        await otpModel.create({
            email,
            otpHash,
            user: user._id
        });

        await sendEmail(email, "Verify your NotesApp email", `Your NotesApp verification code is ${otp}`, html)

        return res.status(200).json({
            message: "OTP has sent on your email.",
            user: {
                id: user._id,
                username: user.username,
                resetPass: user.resetPass
            }
        });
    } catch (err) {
        console.log("Sending forgot email otp: ", err);
        return res.status(500).json({
            message: "Something went wrong email not send!"
        });
    }
}

/**
 * @route /api/auth/reset-password
 * @description reset password using otp and new password.
 * @access Public
 */

const newPasswordController = async (req, res) => {
    const { newPassword } = req.body;
    const { email } = req.params;

    if (!newPassword) {
        return res.status(400).json({
            message: "Enter new password!"
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found with this email!"
            });
        }

        const hashPass = await bcrypt.hash(newPassword, 10);
        user.password = hashPass;
        await user.save();

        return res.status(200).json({
            message: "Password changed successfully!"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

module.exports = {
    userRegisterController,
    userLoginController,
    verifyEmailController,
    refreshAccessTokenController,
    getMeController,
    logoutController,
    forgotPasswordController,
    newPasswordController
}