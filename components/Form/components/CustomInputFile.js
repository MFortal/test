import { useState } from "react";
import { useRef } from "react";

export const CustomInputFile = ({ doc, selectDoc, deleteFile, key }) => {
  const ref = useRef(null);
  const [fileName, setFileName] = useState();

  const handleChange = (e) => {
    setFileName(e?.target?.files[0]?.name);
  };

  const clearNameFile = () => {
    setFileName();
  };

  return (
    <div
      key={key}
      className={
        selectDoc.find((item) => item === doc.value)
          ? "doc_upload"
          : "doc_upload_hidden"
      }
      id="cd_egrip"
      title={doc.label}
    >
      <div className="doc_upload_wrap">
        <input
          ref={ref}
          type="file"
          onChange={(e) => handleChange(e)}
          name={name}
          multiple="multiple"
          className="input_doc_hidden"
          //required
        />
        <input type="hidden" id={doc.value} />
        <div className="doc_upload_input">
          <div className="doc_upload_input_caption">
            <label htmlFor={doc.value} className="doc_upload_label_file ">
              <span className="label_file_title">{doc.label}</span>
              <span className="file_load_title">{fileName}</span>
            </label>
          </div>
          <div
            className="doc_upload_button"
            onClick={() => ref.current.click()}
          >
            Загрузить
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteFile();
              clearNameFile();
            }}
            className="doc_upload_clear"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
