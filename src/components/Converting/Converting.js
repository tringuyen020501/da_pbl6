import axios from "axios";
import React, { useContext } from "react";
import Tesseract from "tesseract.js";
import { AppContext, UserContext } from "../../App";
import "../../index.css";

function Converting() {
   const [isLoading, setIsLoading] = React.useState(false);
   const [image, setImage] = React.useState("");
   const [text, setText] = React.useState("");
   const [progress, setProgress] = React.useState(0);

   const [, setActiveStep] = useContext(AppContext);
   const [, setUser] = useContext(UserContext);

   // const handleSubmit = () => {
   //    setIsLoading(true);
   //    Tesseract.recognize(image, "vie", {
   //       logger: (m) => {
   //          console.log(m);
   //          if (m.status === "recognizing text") {
   //             setProgress(parseInt(m.progress * 100));
   //          }
   //       },
   //    })
   //       .catch((err) => {
   //          console.error(err);
   //       })
   //       .then((result) => {
   //          console.log(result.data);
   //          setText(result.data.text);
   //          setIsLoading(false);
   //       });
   // };
   const handleUpload = (e) => {
      e.preventDefault();

      const formdata = new FormData();

      const direc = [
         "img_front",
         "img_back",
         "img_inner_left",
         "img_inner_right",
      ];
      // [index,file] : destruturing
      for (let [index, file] of Object.entries(image)) {
         formdata.append(direc[index], file);
      }

      axios({
         url: "http://pi.tuongnh.tech:8000/extract/",
         method: "POST",
         headers: {
            "Content-Type": "multipart/form-data",
         },
         data: formdata,
      }).then(
         (res) => {
            setUser(res.data);
            setActiveStep((c) => c + 1);
         },
         (err) => {
            console.log(err);
         }
      );
   };

   return (
      <div className="container" style={{ height: "100vh" }}>
         <div className="row h-100">
            <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
               {!isLoading && (
                  <h1 className="text-center py-5 mc-5">Image To Text</h1>
               )}
               {isLoading && (
                  <>
                     <progress
                        className="form-control"
                        value={progress}
                        max="100"
                     >
                        {progress}%{" "}
                     </progress>{" "}
                     {progress} %
                  </>
               )}
               {!isLoading && !text && (
                  <>
                     <input
                        type="file"
                        multiple
                        onChange={(e) => {
                           setImage(e.target.files);
                        }}
                        className="form-control mt-5 mb-2"
                     />
                     <input
                        type="button"
                        onClick={handleUpload}
                        className="btn btn-primary mt-5"
                        value="Upload"
                     />
                     {/* <input
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary mt-5"
                        value="Convert"
                     /> */}
                  </>
               )}
               {!isLoading && text && (
                  <>
                     <textarea
                        className="form-control w-100 mt-5"
                        rows="30"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                     ></textarea>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default Converting;
