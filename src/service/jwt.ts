import jwt from 'jwt-simple'
import moment from 'moment'
import User from '../models/user'
 const pass = 'passT'

export const jwT = function(user:User){
    const payload = {
        sub: user.id,   
        name: user.first_name,
        iat: moment().unix(),
        exp: moment().day(10).unix()
    }
    
    return jwt.encode(payload,pass)
}