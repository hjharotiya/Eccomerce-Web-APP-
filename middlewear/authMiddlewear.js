import JWT from 'jsonwebtoken';
import userModal from '../model/userModal.js';


// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
	try {
		console.log("****",req.headers.authorization);
		const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
		req.user = decode;
		next();
	} catch (error) {
		console.log(error);
	}
}

// Admin Access


export const isAdmin = async (req, res,next) => {
	try {
		const user = await userModal.findById(req.user._id);
		if (user.role !== 1) {
		return res.status(401).send({
			success: false,
			message: 'unAuthorized User'
		});
	} else {
		next();
	}
	} catch (error) {
		console.log(error);

	}
}