// "use server";

// import connect from "../db";
// import User from "../models/user.model";

// const createUser = async (userData: {
//   clerkId: string;
//   name: string;
//   email: string;
//   photo: string;
// }) => {
//   try {
//       if (!userData.clerkId || !userData.name || !userData.email) {
//         throw new Error("Missing required fields: clerkId, name, or email");
//       }
//     await connect();
//     const newUser = await User.create(userData);
//     await newUser.save();
//     return newUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw new Error("Failed to create user");
//   }
// };

// export default createUser;