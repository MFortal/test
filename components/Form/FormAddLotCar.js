import { styleSelectLot } from "@/common/styleSelect";
import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { getObjOptions } from "@/helpers/getObjOptions";
import { getAuthorization } from "@/helpers/getToken";
import { Field, FormikProvider } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CustomSelect from "./components/CustomSelect";

export default function FormAddLotCar({
  formik,
  initialBody,
  initialModel,
  initialGeneration,
  optionsTypesCar,
  optionsBrandsCar,
  optionsEnginesCar,
  optionsTransmissionsCar,
  optionsDrivesCar,
  initialDataFromLS,
  submitFormCar,
  responseData,
  setResponseData,
}) {
  const ref = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [modelDisabled, setModelDisabled] = useState(true);
  const [bodyDisabled, setBodyDisabled] = useState(true);
  const [generationDisabled, setGenerationDisabled] = useState(true);

  const [models, setModels] = useState(initialModel);
  const [bodies, setBodies] = useState(initialBody);
  const [generations, setGenerations] = useState(initialBody);

  const filesLS = localStorage.dataFiles
    ? Array.from(new Map(JSON.parse(localStorage.dataFiles)).values())
    : [];
  const [selectedFields, setSelectedFields] = useState(filesLS);

  const handleChangeFile = (e) => {
    const formData = new FormData();

    const files = e.target.files;

    formData.append("typeFileId", 9999);
    formData.append("typeFileName", "Фото_лота");

    for (let i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    if (formData.has("file[]")) {
      connection
        .post("/api/v1/uploadPhotosTemp/", formData, {
          headers: getAuthorization(),
        })
        .then((response) => {
          const files = new Map();
          for (let file of response.data) {
            files.set(file.name, file);
          }
          localStorage.dataFiles = JSON.stringify(Array.from(files.entries()));
          setSelectedFields(Array.from(files.values()));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            clearUserData(dispatch, router);
          }
        });
    }
  };

  const clickBackForm = (e) => {
    e.preventDefault();
    localStorage.dataLot = JSON.stringify(formik.values);
    router.push("/add_lot");
  };

  const getModels = (newBrand) => {
    if (formik.values.brand.value != newBrand.value) {
      formik.setFieldValue("brand", newBrand);
      formik.setFieldValue("model", initialModel[0]);

      if (newBrand.value == 0) {
        setModelDisabled(true);
        setModels(initialModel);
      } else {
        setModelDisabled(false);

        connection
          .get(
            `/api/v1/info/getModelCar/${newBrand.value}/${formik.values.type.value}`
          )
          .then((response) => {
            setResponseData(response.data.data);

            const newModels = [
              ...initialModel,
              ...getObjOptions(response.data.data),
            ];

            setModels(newModels);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const changeModel = (newModel) => {
    formik.setFieldValue("model", newModel);

    const current = responseData.find((x) => x.id == newModel.value);
    const bodies = current.bodies;
    const generations = current.generations;

    setBodyDisabled(false);
    setGenerationDisabled(false);

    setBodies([...initialBody, ...getObjOptions(bodies)]);
    setGenerations([...initialGeneration, ...getObjOptions(generations)]);
  };

  const getModelsType = (newType) => {
    if (formik.values.type.value != newType.value) {
      formik.setFieldValue("type", newType);

      if (newType.value == 0) {
        setModelDisabled(true);
        setModels(initialModel);
      } else {
        setModelDisabled(false);

        connection
          .get(
            `/api/v1/info/getModelCar/${formik.values.brand.value}/${newType.value}`
          )
          .then((response) => {
            setResponseData(response.data.data);

            const newModels = [
              ...initialModel,
              ...getObjOptions(response.data.data),
            ];

            setModels(newModels);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    console.log(initialDataFromLS);

    if (initialDataFromLS.type && initialDataFromLS.brand) {
      connection
        .get(
          `/api/v1/info/getModelCar/${initialDataFromLS.brand.value}/${initialDataFromLS.type.value}`
        )
        .then((response) => {
          const responseData = response.data.data;
          setResponseData(responseData);

          const newModels = [...initialModel, ...getObjOptions(responseData)];
          const data = responseData.find(
            (x) => x.id == initialDataFromLS.model.value
          );

          setModels(newModels);
          setBodies([...initialBody, ...getObjOptions(data.bodies)]);
          setGenerations([
            ...initialGeneration,
            ...getObjOptions(data.generations),
          ]);

          setModelDisabled(false);
          setBodyDisabled(false);
          setGenerationDisabled(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <FormikProvider value={formik}>
      <form
        className="adding_lot_wrap"
        encType="multipart/form-data"
        onSubmit={(e) => submitFormCar(e)}
      >
        <div className="adding_lot_item">
          <span className="adding_lot_title">Название и описание лота</span>
          <div className="adding_lot_input">
            <Field
              type="text"
              placeholder="Название*"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              required
            />
            <label className="input_wrap">
              <Field
                type="text"
                placeholder="Полный адрес*"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {/* <span className="input_btn_map btn_site">Указать на карте</span> */}
            </label>
            <div>
              <Field
                type="text"
                placeholder="Желаемая стоимость*"
                name="initial_price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.initial_price}
              />
              {formik.touched.initial_price && formik.errors.initial_price && (
                <p className="error">{formik.errors.initial_price}</p>
              )}
            </div>
            <Field
              as="textarea"
              type="text"
              placeholder="Описание лота*"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            <div className="doc_upload_wrap">
              <input
                ref={ref}
                type="file"
                onChange={(e) => handleChangeFile(e)}
                name="files[]"
                className="input_doc_hidden"
                multiple
              />
              <input type="hidden" id={`express_cd_egripList`} />
              <div className="doc_upload_input">
                <div className="doc_upload_input_caption">
                  <label
                    htmlFor={`express_cd_egripList`}
                    id={`express_cd_egripListLabel`}
                    className="doc_upload_label_file "
                  >
                    <span className="label_file_title">
                      Загрузите фотографии*
                    </span>
                    {/* <span className="file_load_title">{fileName}</span> */}
                  </label>
                </div>
                <div
                  className="doc_upload_button"
                  onClick={() => ref.current.click()}
                >
                  Загрузить
                </div>
              </div>
              {formik.touched.files && formik.errors.files && (
                <p className="error">{formik.errors.files}</p>
              )}
            </div>
            <div className="photo-wrap">
              {selectedFields &&
                selectedFields.map((file) => (
                  <img
                    src={file.url}
                    key={file.name}
                    style={{
                      width: "40%",
                      height: "180px",
                      borderRadius: "5px",
                    }}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="adding_lot_item">
          <span className="adding_lot_title">
            Дополнительная информация о лоте
          </span>

          <div className="adding_lot_input box__half">
            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.type}
                options={optionsTypesCar}
                value={formik.values.type}
                onChange={(value) => getModelsType(value)}
              />
            </div>
            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.brand}
                options={optionsBrandsCar}
                value={formik.values.brand}
                onChange={(value) => getModels(value)}
              />
            </div>
            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.model}
                options={models}
                isDisabled={modelDisabled}
                value={formik.values.model}
                onChange={(value) => changeModel(value)}
              />
            </div>

            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.body}
                options={bodies}
                isDisabled={bodyDisabled}
                value={formik.values.body}
                onChange={(value) => formik.setFieldValue("body", value)}
              />
            </div>

            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.generation}
                options={generations}
                isDisabled={generationDisabled}
                value={formik.values.generation}
                onChange={(value) => formik.setFieldValue("generation", value)}
              />
            </div>

            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.drive}
                options={optionsDrivesCar}
                value={formik.values.drive}
                onChange={(value) => formik.setFieldValue("drive", value)}
              />
            </div>

            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.transmission}
                options={optionsTransmissionsCar}
                value={formik.values.transmission}
                onChange={(value) =>
                  formik.setFieldValue("transmission", value)
                }
              />
            </div>

            <div className="input_container">
              <CustomSelect
                className="react-select-container"
                styles={styleSelectLot}
                defaultValue={formik.values.engine}
                options={optionsEnginesCar}
                value={formik.values.engine}
                onChange={(value) => formik.setFieldValue("engine", value)}
              />
            </div>

            <div className="input_container">
              <Field
                type="text"
                placeholder="Объем двигателя"
                name="volume"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.volume}
              />
              {formik.touched.volume && formik.errors.volume && (
                <p className="error">{formik.errors.volume}</p>
              )}
            </div>

            <div className="input_container">
              <Field
                type="text"
                placeholder="Год выпуска"
                name="year"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
              />
              {formik.touched.year && formik.errors.year && (
                <p className="error">{formik.errors.year}</p>
              )}
            </div>

            <div className="input_container">
              <Field
                type="text"
                placeholder="Пробег"
                name="mileage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mileage}
              />
              {formik.touched.mileage && formik.errors.mileage && (
                <p className="error">{formik.errors.mileage}</p>
              )}
            </div>
          </div>
          <div className="adding_lot_input box__half"></div>
        </div>
        <div className="adding_lot_btn_box">
          <button className="btn_site" type="submit">
            Завершить
          </button>
          <button
            className="btn_site btn_site_white"
            type="reset"
            onClick={(e) => clickBackForm(e)}
          >
            Назад
          </button>
        </div>
      </form>
    </FormikProvider>
  );
}
