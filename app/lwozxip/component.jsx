"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { useDispatch } from "react-redux";
import { setBgImage, setButton1, setFont1, setFont2, setFontT1, setFontT2, setHeader1, setHeader2, setRedirection, setTemplate, setTextColor, setbackground, setbuttoncss, setimage } from "../redux/reducer/prosite_data";

const Component = () => {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const dispatch = useDispatch()
  const temp = searchparams.get("temp");
  const ndata = searchparams.get("data")
  const addData = searchparams.get("addData")
  const [prositeData, setPrositeData] = useState(null)

  useEffect(() => {
    if (ndata) {

      const dfta = ndata ? JSON.parse(ndata) : null
      setPrositeData(dfta)
    }
  }, [ndata])

  const router = useRouter();

  const fetchid = async () => {
    try {
      const res = await axios.get(
        `https://work.grovyo.xyz/api/v1/fetchwithid/${id}`
      );
      // const res = await axios.get(`http://localhost:7190/api/v1/fetchwithid/${id}`)
      console.log(res.data);
      if (res.data.success) {
        const data = res.data.data;
        sessionStorage.setItem("data", JSON.stringify(data));
        dispatch(setTemplate(Number(temp)))

        const { backgroundImage, backgroundColor, image, headline, description, button, fonts, color } = prositeData || {}

        if (prositeData && addData == "true") {
          if (backgroundImage && !backgroundColor) {
            console.log("1")
            dispatch(setBgImage(backgroundImage))
          } else if (!backgroundImage && backgroundColor) {
            console.log("2")
            dispatch(setbackground(backgroundColor))
          }

          if (backgroundImage && backgroundColor) {
            console.log("3", backgroundImage, backgroundColor)
            dispatch(setbackground(backgroundColor))
            dispatch(setBgImage(backgroundImage))
          }

          dispatch(setimage(image))
          dispatch(setHeader1(headline))
          dispatch(setHeader2(description))
          dispatch(setTemplate(Number(temp)))
          dispatch(setButton1(button.text))
          dispatch(setTextColor(color))
          dispatch(setRedirection(button.link))
          dispatch(
            setbuttoncss({
              padding: button?.id?.padding,
              color: button?.id?.color,
              borderRadius: button?.id?.borderRadius,
              borderStyle: button?.id?.borderStyle,
              backgroundColor: button?.id?.backgroundColor,
              borderColor: button?.id?.borderColor,
              borderTop: button?.id?.borderTop,
              borderBottom: button?.id?.borderBottom,
              borderRight: button?.id?.borderRight,
              borderLeft: button?.id?.borderLeft,
              borderRadiusTop: button?.id?.borderRadiusTop,
              borderRadiusBottom: button?.id?.borderRadiusBottom,
              borderRadiusRight: button?.id?.borderRadiusRight,
              borderRadiusLeft: button?.id?.borderRadiusLeft,
              boxShadow: button?.id?.boxShadow,
              fontBold: button?.id?.fontBold,
            })
          );
          dispatch(setFontT1({ name: fonts[0]?.fontFamily, link: fonts[0]?.link, id: fonts[0]?.id?._id }));
          dispatch(setFontT2({ name: fonts[1]?.fontFamily, link: fonts[1]?.link, id: fonts[1]?.id?._id }));

        }

        sessionStorage.setItem("defaultopen", false);
        router.push("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(window.location.href)

    if (id && addData) {
      fetchid()
    }

  }, [id, prositeData]);

  return (
    <>
      <div>
        <Loading />
      </div>
    </>
  );
};

export default Component;
