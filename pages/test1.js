import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Field, FormikProvider, useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../layouts/MainLayout";
import { decrement, increment, selectCount } from "@/redux/slices/counterSlice";
import { connection } from "@/helpers/connection";

export default function Home() {
  const count = useSelector(selectCount);
  console.log(count);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      files: "",
    },
  });

  const [selectedFields, setSelectedFields] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("nwr");

    const files = e.target[0].files;

    const formData = new FormData();

    for (let i = 0; i < e.target.length; i++) {
      formData.append(`${e.target[i].name}`, e.target[i].value);
      console.log(e.target[i].value);
    }

    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].files) {
        for (let j = 0; j < e.target[i].files.length; j++) {
          formData.append("file[]", e.target[i].files[j]);
          console.log(e.target[i].files[j]);
        }
        console.log("file +");
      }
    }

    console.log(formData);

    connection
      .post(`/api/v1/test/`, formData)
      .then((response) => {
        console.log(response);
        setSelectedFields([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    //setSelectedFields([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFields((prevFiles) => prevFiles.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          src={photo}
          key={photo}
          style={{ width: "20%", height: "180px" }}
        />
      );
    });
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("lot")));
  });

  return (
    <div>
      <MainLayout title={"Блог"}>
        <main>
          <FormikProvider value={formik}>
            <form
              className="personal_data_form"
              onSubmit={(e) => {
                submitForm(e);
              }}
              encType="multipart/form-data"
            >
              <div>
                <label> Upload File</label>
                <input
                  type="file"
                  name="file[]"
                  onChange={handleChange}
                  multiple
                />
              </div>
              <div>
                <label> Upload File</label>
                <input
                  type="file"
                  name="file[]"
                  onChange={handleChange}
                  multiple
                />
              </div>

              <label className="label_box label_box_border">
                Name
                <div className="label_box_div">
                  <Field
                    type="text"
                    placeholder=""
                    name="first_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                  />
                  <span className="focus-border"></span>
                </div>
              </label>

              <div className="personal_data_btn adding_lot_btn_box">
                <button
                  type="submit"
                  className="btn_site"
                  //disabled={formik.isSubmitting}
                >
                  Регистрация
                </button>
                <button type="reset" className="btn_site btn_site_white">
                  Отменить
                </button>
              </div>
            </form>
            <div>{renderPhotos(selectedFields)}</div>
          </FormikProvider>
          <Link href="/test">Test</Link>
        </main>
      </MainLayout>
    </div>
  );
}

{
  /* <form encType="multipart/form-data" onSubmit={(e) => submitForm(e)}>
            <p>Загрузите файл с картинкой</p>
            <p>
              <input
                type="file"
                name="file[]"
                onChange={handleChange}
                multiple
              />
              <input
                type="file"
                name="file[]"
                onChange={handleChange}
                multiple
              />
              <input type="text" name="first_name" />
            </p>
            <div>{renderPhotos(selectedFields)}</div>
            <button type="submit">Отправить</button>
          </form> */
}
