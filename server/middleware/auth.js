import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1]; // always write authorization in lowercase..
        const isCustomAuth = token.length < 500;

        let decodeData;

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');
            req.userId = decodeData?.id;
        } else {
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }
        next();
    } catch (error) {
        console.log(next);
    }
}

export default auth;