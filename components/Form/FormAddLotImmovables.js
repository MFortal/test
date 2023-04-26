import { styleSelectLot } from "@/common/styleSelect";
import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { getAuthorization } from "@/helpers/getToken";
import { Field } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CustomSelect from "./components/CustomSelect";

export default function FormAddLotImmovables({
  submitForm,
  formik,
  optionsDecoration,
  optionsImmovable,
  optionsSewerage,
  optionsGas,
}) {
  const ref = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

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
          console.log(error);
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

  return (
    <form className="adding_lot_wrap" encType="multipart/form-data">
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
          <Field
            type="text"
            placeholder="Желаемая стоимость*"
            name="initial_price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.initial_price}
          />
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
              //required
            />
            <input type="hidden" id="express_cd_egripList" />
            <div className="doc_upload_input">
              <div className="doc_upload_input_caption">
                <label
                  htmlFor="express_cd_egripList"
                  id="express_cd_egripListLabel"
                  className="doc_upload_label_file "
                >
                  <span className="label_file_title">Загрузите фотографии</span>
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
          </div>
          <div className="photo-wrap">
            {selectedFields &&
              selectedFields.map((file) => (
                <img
                  src={file.url}
                  key={file.name}
                  style={{ width: "40%", height: "180px", borderRadius: "5px" }}
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
            <Field
              type="text"
              placeholder="Общая площадь"
              name="total_area"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.total_area}
            />
          </div>
          <div className="input_container">
            <Field
              type="text"
              placeholder="Жилая площадь"
              name="living_area"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.living_area}
            />
          </div>
          <div className="input_container">
            <Field
              type="text"
              placeholder="Количество этажей"
              name="number_floors"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number_floors}
            />
          </div>
          <div className="input_container">
            <Field
              type="text"
              placeholder="Этажей в доме"
              name="house_floors"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.house_floors}
            />
          </div>
          <div className="input_container">
            <Field
              type="text"
              placeholder="Год постройки"
              name="year"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            />
          </div>
        </div>
        <div className="adding_lot_input box__half">
          <div className="input_container">
            <CustomSelect
              className="react-select-container"
              styles={styleSelectLot}
              defaultValue={formik.values.decoration}
              options={optionsDecoration}
              value={formik.values.decoration}
              onChange={(value) => formik.setFieldValue("decoration", value)}
            />
          </div>
          <div className="input_container">
            <CustomSelect
              className="react-select-container"
              styles={styleSelectLot}
              defaultValue={formik.values.type_immovable}
              options={optionsImmovable}
              value={formik.values.type_immovable}
              onChange={(value) =>
                formik.setFieldValue("type_immovable", value)
              }
            />
          </div>

          <div className="input_container">
            <CustomSelect
              className="react-select-container"
              styles={styleSelectLot}
              defaultValue={formik.values.sewerage}
              options={optionsSewerage}
              value={formik.values.sewerage}
              onChange={(value) => formik.setFieldValue("sewerage", value)}
            />
          </div>

          <div className="input_container">
            <CustomSelect
              className="react-select-container"
              styles={styleSelectLot}
              defaultValue={formik.values.gas}
              options={optionsGas}
              value={formik.values.gas}
              onChange={(value) => formik.setFieldValue("gas", value)}
            />
          </div>
        </div>
        <div className="adding_lot_input box__half">
          <div className="input_container">
            <label className="control control-checkbox">
              Паркинг
              <input
                type="checkbox"
                name="parking"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.parking}
                checked={formik.values.parking}
              />
              <div className="control_indicator"></div>
            </label>
          </div>
          <div className="input_container">
            <label className="control control-checkbox">
              Отопление
              <input
                type="checkbox"
                name="heating"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.heating}
                checked={formik.values.heating}
              />
              <div className="control_indicator"></div>
            </label>
          </div>
          <div className="input_container">
            <label className="control control-checkbox">
              Водоснабжение
              <input
                type="checkbox"
                name="water_supply"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.water_supply}
                checked={formik.values.water_supply}
              />
              <div className="control_indicator"></div>
            </label>
          </div>
          <div className="input_container">
            <label className="control control-checkbox">
              Санузел
              <input
                type="checkbox"
                name="lavatory"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lavatory}
                checked={formik.values.lavatory}
              />
              <div className="control_indicator"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="adding_lot_btn_box">
        <button className="btn_site" type="submit" onClick={submitForm}>
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
  );
}
