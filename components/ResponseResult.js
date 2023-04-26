function ResponseResult({ text, status, flag = false }) {
  return (
    <div
      className={
        "result " +
        (status ? "result_success" : "result_error") +
        (flag ? " result_small" : "")
      }>
      {text}
    </div>
  );
}

export default ResponseResult;
