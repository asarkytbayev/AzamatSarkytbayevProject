if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '../../.env'});
}
console.log('The value for MY_SECRET is:', process.env.MY_SECRET);