import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { getAuthorization } from "@/helpers/getToken";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const CustomInputLotFile = ({ doc, selectDoc, deleteFile }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [file, setFile] = useState(selectDoc.get(doc.value) ?? "");

  const handleChange = async (e) => {
    const formData = new FormData();
    const files = e.target.files;

    const folder =
      JSON.parse(localStorage.getItem("folder")) ??
      Date.now() + Math.floor(Math.random() * 1000);

    localStorage.folder = folder;

    formData.append("typeFileId", doc.value);
    formData.append("typeFileName", doc.label);
    formData.append("folder", folder);

    for (let i = 0; i < files.length; i++) {
      formData.append("file[]", files[i]);
    }

    if (Cookies.get("token")) {
      connection
        .post("/api/v1/uploadFilesTemp/", formData, {
          headers: getAuthorization(),
        })
        .then((response) => {
          const newFile = {
            name: response.data.name,
            document_id: response.data.document_id,
            url: response.data.url,
            storage_name: response.data.name,
            path: response.data.path,
            folder: response.data.folder,
          };

          setFile(newFile);

          const files = localStorage.files
            ? new Map(JSON.parse(localStorage.files))
            : new Map();

          files.set(doc.value, newFile);

          localStorage.files = JSON.stringify(Array.from(files.entries()));
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status == 401) {
            clearUserData(dispatch, router);
          }
        });
    } else {
      connection
        .post("/api/v1/registration/juridial/uploadFiles/", formData)
        .then((response) => {
          console.log(response);
          const newFile = {
            name: response.data.name,
            document_id: response.data.document_id,
            url: response.data.url,
            storage_name: response.data.name,
            path: response.data.path,
            folder: response.data.folder,
          };

          localStorage.folder = newFile.folder;

          setFile(newFile);

          const files = localStorage.files
            ? new Map(JSON.parse(localStorage.files))
            : new Map();

          files.set(doc.value, newFile);

          localStorage.files = JSON.stringify(Array.from(files.entries()));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clearNameFile = () => {
    setFile();
  };

  return (
    <div
      className={selectDoc.has(doc.value) ? "doc_upload" : "doc_upload_hidden"}
      id="cd_egrip"
      title={doc.label}
    >
      <div className="doc_upload_wrap">
        <input
          ref={ref}
          type="file"
          onChange={(e) => handleChange(e)}
          name="files[]"
          className="input_doc_hidden"
          //required
        />
        <input type="hidden" id={`express_cd_egripList${doc.value}`} />
        <div className="doc_upload_input">
          <div className="doc_upload_input_caption">
            <label
              htmlFor={`express_cd_egripList${doc.value}`}
              id={`express_cd_egripListLabel${doc.value}`}
              className="doc_upload_label_file "
            >
              <span className="label_file_title">{doc.label}</span>
              {file && (
                <Link
                  className="file_load_title"
                  href={file.url ?? "/"}
                  target="_blank"
                >
                  {file.name}
                </Link>
              )}
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
