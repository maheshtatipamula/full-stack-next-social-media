// import multer from "multer";

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/Images/Posts"));
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now();
//     cb(null, uniquePrefix + file.originalname);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   const allowedFiles = ["image/jpg,image/png,image/jpeg,video/mp4"];
//   if (allowedFiles.includes(file.mineType)) {
//     cb(null, true);
//   } else {
//     console.log("hi");
//     cb(new Error({ message: "Unsupported file type" }));
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 4 * 1024 * 1024, files: 1 },
// });

// export default upload;

// // app.post('/upload',
// //     (req,res)=>{

// //         upload(req,res,(err)=>{
// //             if(err){

// //                 if(err instanceof multer.MulterError){
// //                     if(err.code=='LIMIT_FILE_SIZE')

// //                     res.status(400).send({
// //                         code:'large',
// //                         message:"File is large ,only upload files less than 1MB"
// //                     })
// //                     else{
// //                         res.status(400).send({
// //                             code:"unknown",
// //                             message:"Error while uploading"
// //                         })

// //                     }
// //                 }
// //                 else{
// //                     res.status(400).send({
// //                         code:"invalid type",
// //                         message:"Invalid file type only allowed jpeg,jpg"
// //                     })

// //                 }

// //             }
// //             else{
// //                 res.send({
// //                     code:"success",
// //                     message:"uploaded successfully"
// //                 })
// //             }

// //         })

// //     }
// // )
