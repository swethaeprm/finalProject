// import react, { useEffect, useContext, useState } from 'react';
// import { cognitoUserAttribute } from 'amazon-cognito-identity-js'
// export default () => {
//     const [usertype, setUsertype] = useState('');

//     useEffect(() => {

//     }, []);

//     const onSubmit = event => {
//         event.preventDefault();
//         const user = {
//             "username": "swetha",
//             "password": "Password@123"
//         }
//         const attributes = [
//             new cognitoUserAttribute({ Name: 'custom:usertype', Value: usertype })
//         ];
//         user.updateAttributes(attributes, (err, result) => {
//             if (err) console.error(err);
//             console.log(result)

//         })
//     }

//     return (
//         <div>
//             <h1>update att</h1>
//             <form onSubmit={onSubmit}>
//                 <input value={usertype} onChange={event => setUsertype(event.target.value)} />
//                 <button type='submit'>sub</button>
//             </form>
//         </div>
//     );
// }