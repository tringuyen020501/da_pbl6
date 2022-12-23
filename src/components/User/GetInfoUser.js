import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function GetInfoUser() {
   const [infos, setInfos] = useState([]);
   const [searchParams] = useSearchParams();
   // console.log([...searchParams]);

   useEffect(() => {
      var requestOptions = {
         method: "GET",
         redirect: "follow",
      };

      fetch(
         "https://pbl6.tuongnh.tech/clur/?page=3&num_per_page=4",
         requestOptions
      )
         .then((response) => response.json())
         .then((infos) => {
            setInfos(infos);
            // console.log(JSON.stringify(infos[0].data));
            render(<p>{JSON.stringify(infos[0].data)}</p>);
         })
         .catch((error) => console.log("error", error));
   }, []);
   // const value = JSON.stringify(infos[0].data);

   return <div>{/* <p>{value}</p> */}</div>;
}

export default GetInfoUser;
