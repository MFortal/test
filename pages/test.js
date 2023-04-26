import { MainLayout } from "../layouts/MainLayout";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCount } from "@/redux/slices/counterSlice";
import { connection } from "@/helpers/connection";
import Link from "next/link";
import { useRef } from "react";
import { useState } from "react";
import { selectAuthState, setAuthState } from "@/redux/slices/authSlice";
import { useFormik } from "formik";
import { current } from "@reduxjs/toolkit";

export default function Home() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  const fileRef = useRef(null);

  const [image, setImage] = useState([]);

  const formData = new FormData();

  const handleChange = async (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
      setImage((current) => [...current, files[i]]);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
    },
    onSubmit: (values) => {
      for (let value in values) {
        formData.append(value, values[value]);
      }

      for (let property of formData.entries()) {
        console.log(property[0], property[1]);
      }
      connection
        .post(`/api/v1/test/`, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    const lot = { name: "lot1", is: 0 };
    localStorage.lot = JSON.stringify(lot);
    localStorage.lot = JSON.stringify({ name: "lot2" });
    localStorage.removeItem("lot");
  });

  return (
    <div>
      <main>
        <Link href="/test1">Test1</Link>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div>
            <label> first_name</label>
            <input
              type="text"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
          </div>
          <div>
            <label> Upload File</label>
            <input type="file" name="file" onChange={(e) => handleChange(e)} />
          </div>

          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
