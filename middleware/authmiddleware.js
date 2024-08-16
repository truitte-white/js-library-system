const { tokenMiddleware } = require('../middleware/index');

module.exports = {
    auth: async (req, res, next) => {
        try {
            // Extract the token from cookies
            const token = req.cookies.token;

            if (!token) {
                throw new Error('Token not found');
            }

            // Decode the token
            const decoded = tokenMiddleware.decode(token);

            if (!decoded.userId) {
                throw new Error('Invalid token: userId not found');
            }

            // Set userId on the request object and proceed
            req.userId = decoded.userId;
            next();
        } catch (err) {
            console.error('Error in authentication middleware:', err.message);
            res.locals.message = "Please login to continue.";
            return res.redirect("/rfs-library/users/login");
        }
    }
};


// module.exports = {
//     auth: async (req, res, next) => {
//         try {
//             const token = req.cookies && req.cookies.token;
//             console.log('Token retrieved:', token);
//             if (!token) {
//                 throw new Error('Token not found');
//             }

//             const decoded = await tokenMiddleware.decode(token, next);
//             console.log('Decoded token:', decoded); 
//             if (!decoded.userId) {
//                 throw new Error('Invalid token: userId not found');
//             }

//             req.userId = decoded.userId;
//             next();
//         } catch (err) {
//             console.error('Error in authentication middleware:', err.message);
//             res.locals.message = "Please login to continue.";
//             return res.redirect("/users/login");
//         }
//     }
// };