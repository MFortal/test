import Link from "next/link";

export const Breadcrumb = ({
  currentName,
  secondLinkName = false,
  secondLinkPath = false,
  marginBtn = true,
}) => {
  return (
    <div className={`page_head ${marginBtn ? "margin_bottom" : ""}`}>
      <div className="grid_container">
        <div className="breadcrumb">
          <ul>
            <li>
              <Link href="/" className="breadcrumbs__link">
                Главная
              </Link>
            </li>
            {secondLinkPath && (
              <li>
                <Link href={`/${secondLinkPath}`} className="breadcrumbs__link">
                  {secondLinkName}
                </Link>
              </li>
            )}
            <li className="breadcrumbs__current">{currentName}</li>
          </ul>
        </div>
        <h1 className="page_titile">{currentName}</h1>
      </div>
    </div>
  );
};
