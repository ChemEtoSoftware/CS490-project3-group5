import React from 'react';
// import { GoogleLogin } from 'react-google-login';

export const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        console.log('newAuthRes:', newAuthRes);
        console.log('newAuthToken', newAuthRes.id_token);
        setTimeout(refreshToken, refreshTiming);
    };
    
    setTimeout(refreshToken, refreshTiming);
};

// export default refreshTokenSetup;
