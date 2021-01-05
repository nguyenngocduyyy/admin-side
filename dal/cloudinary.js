const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "dyj83giph",
    api_key: "667615846219446",
    api_secret: "AdJk5Pt6cxEXybNerTsJH2VpX_U"
});

exports.cloudinary = cloudinary;