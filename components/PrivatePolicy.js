import Link from "next/link";

export const PrivatePolicy = ({ isChange = false }) => {
  return (
    <div className="personal_data_private_policy">
      <p>
        <span className="red">*</span>Отмеченные звездочкой поля обязательны для
        заполнения
      </p>

      {!isChange && (
        <p>
          <span className="red">*</span>Нажимая кнопку “Регистрация”, Вы даете
          свое &nbsp; <br />
          <Link href="/argeement">
            согласие на обработку персональных данных
          </Link>
        </p>
      )}
    </div>
  );
};
