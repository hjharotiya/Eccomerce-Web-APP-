import { hashPassword } from "../helper/authHelper.js";
import userModal from "../model/userModal.js";

export const registerController = async (req,res) => {
	const { name, email, phone, address, password } = req.body;

	// validation
	if (!name) {
		return res.send({ error: "Name is required" });
	}
	if (!email) {
		return res.send({ error: "Email is required" });
	}
	if (!phone) {
		return res.send({ error: "Phone is required" });
	}
	if (!password) {
		return res.send({ error: "Password is required" });
	}
	if (!address) {
		return res.send({ error: "Address is required" });
	}

	// check User
	const exisitingUser = await userModal.findOne({ email });
	// exiting User
	if (exisitingUser) {
		return res.status(200).send({
			success: true,
			message: 'User Already register please Login',
		});
	}

	// register user 
	const hasedPassword = await hashPassword(password);
	// save()

	const user = await new userModal({ name, email, phone, address, password:hasedPassword }).save();

	res.status(201).send({
		success: true,
		message: "user register Successfully",
		user
	})


}
