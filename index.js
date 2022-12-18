const express = require('express');
const cors = require('cors');
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    const appId = process.env.APP_ID;
    const appCertificate = process.env.APP_CERT;
    const channelName = 'fiesta';
    const role = RtcRole.PUBLISHER;
    const exp = 3600;
    const uid = 0;
    const currentTime = Math.floor(Date.now() / 1000);
    const expT = currentTime + exp;
    const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, expT);
    res.json({"token":token});
});

app.listen(8080);