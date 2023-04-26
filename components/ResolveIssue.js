import Link from "next/link";

export const ResolveIssue = () => {
  return (
    <div className="resolve_issues margin_bottom">
      <div className="grid_container resolve_issues_wrap">
        <div className="resolve_issues_left">
          <span className="resolve_issues_title">
            Если у вас возникли вопросы, свяжитесь с нами
          </span>
          <span className="resolve_issues_subtitle">
            Получить консультацию по всем интересующим вопросам можно у наших
            специалистов
          </span>
          <Link href="tel:+ 7(000) 000-00-00" className="resolve_issues_phone">
            + 7(000) 000-00-00
          </Link>
          <div className="resolve_issues_foto">
            <img src="/images/igor.png" alt="" />
          </div>
          <span className="resolve_issues_job">
            Руководитель направления <br />
            Реализация федерального имущества
          </span>
          <span className="resolve_issues_fio">Игорь Игорев</span>
          <Link href="mailto:Igor@gmail.com" className="resolve_issues_email">
            Igor@gmail.com
          </Link>
        </div>
        <div className="resolve_issues_right">
          <div className="wrap_blue">
            <h2 className="resolve_issues_title2">
              Как принять участие в торгах?
            </h2>
            <div className="resolve_issues_bottom">
              <span className="resolve_issues_subtitle2">
                Не следует, однако, забывать, что сложившаяся структура
                организации обеспечивает широкому кругу
              </span>
              <Link href="" className="resolve_issues_link"></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
