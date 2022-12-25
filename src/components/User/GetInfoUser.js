import { Grid, TextField } from "@mui/material";
import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

function GetInfoUser() {
   const [infos, setInfos] = useState([]);
   const [searchParams] = useSearchParams();
   // console.log([...searchParams]);

   const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
   }));

   const list = useEffect(() => {
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

            render(
               <Box
                  component="form"
                  sx={{
                     "& .MuiTextField-root": { m: 1, width: "60ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  textAlign="center"
               >
                  <h3>
                     <b>Thông tin về chủ sở hữu</b>
                  </h3>
                  <br />
                  <TextField
                     id="filled-read-only-input"
                     defaultValue="Chủ sở hữu"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data["Thông tin về chủ sở hữu"]["Chủ sở hữu"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="Năm sinh"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data["Thông tin về chủ sở hữu"]["Năm sinh"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="CMND số"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data["Thông tin về chủ sở hữu"]["CMND số"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="Địa chỉ thường trú"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data["Thông tin về chủ sở hữu"][
                           "Địa chỉ thường trú"
                        ]
                     ).replaceAll('"', "")}
                  />
                  <h3>
                     <b>Thửa đất, nhà ở và tài sản khác gắn liền với đất</b>
                  </h3>
                  <br />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="Số vào sổ cấp GCN"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["Số vào sổ cấp GCN"]
                     ).replaceAll('"', "")}
                  />
                  <br />
                  <p>
                     <b>1. Thửa đất:</b>
                  </p>

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="a) Thửa đất số"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["a) Thửa đất số"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="b) Địa chỉ"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["b) Địa chỉ"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="c) Diện tích"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={
                        JSON.stringify(
                           infos[0].data[
                              "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                           ]["1. Thửa đất:"]["c) Diện tích"]
                        ).replaceAll('"', "") +
                        " (" +
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["(bằng chữ"]
                     }
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="d) Hình thức sử dụng"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["d) Hình thức sử dụng"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="đ) Mục đích sử dụng"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["đ) Mục đích sử dụng"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="e) Thời hạn sử dụng"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["e) Thời hạn sử dụng"]
                     ).replaceAll('"', "")}
                  />

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="g) Nguồn gốc sử dụng"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     fullWidth
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["1. Thửa đất:"]["g) Nguồn gốc sử dụng"]
                     ).replaceAll('"', "")}
                  />

                  <br />
                  <p>
                     <b>2. Nhà ở:</b>
                  </p>

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="2. Nhà ở:"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["2. Nhà ở:"]
                     ).replaceAll('"', "")}
                  />

                  <br />
                  <p>
                     <b>3. Công trình xây dựng khác:</b>
                  </p>

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="3. Công trình xây dựng khác:"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["3. Công trình xây dựng khác:"]
                     ).replaceAll('"', "")}
                  />

                  <br />
                  <p>
                     <b>4. Rừng sản xuất là rừng trồng:</b>
                  </p>

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="4. Rừng sản xuất là rừng trồng:"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["4. Rừng sản xuất là rừng trồng:"]
                     ).replaceAll('"', "")}
                  />

                  <br />
                  <p>
                     <b>5. Cây lâu năm:</b>
                  </p>

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="5. Cây lâu năm:"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["5. Cây lâu năm:"]
                     ).replaceAll('"', "")}
                  />

                  <br />
                  <p>
                     <b>6. Ghi chú:</b>
                  </p>

                  <TextField
                     id="filled-read-only-input"
                     defaultValue="6. Ghi chú:"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Thửa đất, nhà ở và tài sản khác gắn liền với đất"
                        ]["6. Ghi chú:"]
                     ).replaceAll('"', "")}
                  />

                  <h3>
                     <b>Những thay đổi sau khi cấp giấy chứng nhận</b>
                  </h3>
                  <br />
                  <TextField
                     id="filled-read-only-input"
                     defaultValue="Nội dung thay đổi"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        infos[0].data[
                           "Những thay đổi sau khi cấp giấy chứng nhận"
                        ]["Nội dung thay đổi"]
                     ).replaceAll('"', "")}
                  />

                  <h3>
                     <b>land_image</b>
                  </h3>
                  <br />
                  <TextField
                     id="filled-read-only-input"
                     defaultValue="land_image"
                     InputProps={{
                        readOnly: true,
                     }}
                     variant="filled"
                  />
                  <TextField
                     style={{ textAlign: "center" }}
                     InputProps={{
                        readOnly: true,
                     }}
                     defaultValue={JSON.stringify(
                        "https://pbl6.tuongnh.tech" +
                           infos[0].data["land_image"]
                     ).replaceAll('"', "")}
                  />
               </Box>
            );
         })
         .catch((error) => console.log("error", error));
   }, []);
   // const value = JSON.stringify(infos[0].data);

   return <div>{list}</div>;
}

export default GetInfoUser;
