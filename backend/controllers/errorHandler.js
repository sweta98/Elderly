

exports.handleError = function (err, res, default_code){
    if (err == "Unauthorized User Exception") {
        // Send authorized response
        res.status(401).json({message: "Unauthorized", destination: "/"});
    }else if (err == "Invalid Token Exception") {
        // Send unauthorized response
        res.status(401).json({message: "Unauthorized", destination: "/"});
    }else if (err.status == 401) {
        res.status(401).json({message: err.message, destination: "/"}); 
    }else if (err.status == 503) {
        res.status(503).json({message: err.message, destination: "/maintenance"});
    } else if (err.code == 11000){
        res.status(500).json({message: "Username is already taken"});
    }else {
        let code = (err.status != null)? err.status:default_code;
        res.status(code).json({message:err.message});
    }
}