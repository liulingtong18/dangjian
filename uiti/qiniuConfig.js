var qiniu = require('qiniu')


module.exports = function () {
    var accessKey = 'hiaSMM1QqBT-0Q0KywiDrpp_tXbgBz8p1mFXkoil';
    var secretKey = 'A4to1dxJHlKuQ_HuoKWhdf34-J3B_dYzt4eIT5tl';    //秘钥
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);   //用秘钥进行签名
    
    var options = {
        scope: 'didi',     //七牛云储存的地方
        expires: 7200      //签名的有效时间
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);   //是上传凭证
    return uploadToken
}