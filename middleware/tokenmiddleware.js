const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET || 'your256bitsecretkeyshouldbreaktought';

module.exports = {
    sign: (body) => {
        return jwt.sign(body, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    },
    decode: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            return decoded;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new Error('Token expired');
            }
            throw err;
        }
    },
};

// module.exports = {
//     sign: async (body) => {
//         console.log('Secret Key:', process.env.TOKEN_SECRET || 'Fallback Secret');
//         console.log(body)
//         console.log(secretKey)
//         return jwt.sign(body, secretKey, { expiresIn: "1h" });
//     },
//     decode: async (token) => {
//         try {
//             const decoded = jwt.verify(token, secretKey);
//             return decoded;
//         } catch (err) {
//             if (err.name === 'TokenExpiredError') {
//                 throw new Error('Token expired');
//             }
//             throw err;
//         }
//     }
// };



// module.exports = {
//     sign: async (body, next) => {
//         return await jwt.sign(body, process.env.TOKEN_SECRET, { expiresIn: "1h" });
//     },
//     decode: async (token, next) => {
//         try {
//             const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//             return decoded;
//         } catch (err) {
//             if (err.name === 'TokenExpiredError') {
//                 throw new Error('Token expired');
//             }
//             throw err;
//         }
//     },
// };
