export const getObjOptions = (array) => {
  return array.map((x) => ({
    value: x.id,
    label: x.name,
  }));
};

export const getObjOptionsDocuments = (array) => {
  return array.map((x) => ({
    value: x.id,
    label: x.name,
    category_id: x.category_id,
  }));
};
