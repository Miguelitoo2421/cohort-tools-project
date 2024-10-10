function errorHandling (app){
  app.use((error, req,res,next)=>{
    console.log(error)
    res.status(500).json({errorMessage: "problemas de servidor"})
    
  })
}
module.exports = errorHandling