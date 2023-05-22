import User from "../models/user";
// read
export const getUser = async (req, res) => {
    try {
        //gets user id from req
        const { id } = req.params;
        // creates user from user id
        const user = await user.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
export const getUserFriends = async (req, res) => {
    try {

        //retrieves user id from req
        const { id } = req.params;
        //creates user from id 
        const user = await user.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => user.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, LastName, occupation, location, picturePath }) => {
                return { _id, firstName, LastName, occupation, location, picturePath };
            }
        );
        req.status(200).json({ formattedFriends });
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
};
//update
export const addRemoveFriend = async (req, res) => {
    try {
        //retrieves friend and user from req
        const { id, friendId } = req.params;
        //creates the friend and user to be manipulated for adding / removing
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        // removing friend
        if (user.friends.included(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId);
            friend.friends = user.friends.filter(id => id !== id);
        }
        //adds friend
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => user.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, LastName, occupation, location, picturePath }) => {
                return { _id, firstName, LastName, occupation, location, picturePath };
            }
        );

        res.status(200).json({ formattedFriends });

    } catch (err) {
        res.status(404).json({ message: err.message });

    }
};