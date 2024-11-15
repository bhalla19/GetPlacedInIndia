function error_middleware(){
    return res.status(404).json({
        message:"Error occured",
        success:false
    })
}

export default error_middleware