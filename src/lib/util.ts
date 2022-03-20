type ObjectWithAnyTypes = {
  [key: string]: any;
};

export function omit(obj: ObjectWithAnyTypes, ...props: string[]) {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}
export function pick(obj: ObjectWithAnyTypes, ...props: string[]) {
  return props.reduce((result: ObjectWithAnyTypes, prop) => {
    result[prop] = obj[prop];
    return result;
  }, {});
}
