import { GroceryList } from '../redux/model.interface';

export const not = (a: GroceryList, b: GroceryList): GroceryList => {
  const keys = Object.keys(a).filter(
    (value) => Object.keys(b).indexOf(value) === -1,
  );
  let object = {};
  keys.forEach((value) => {
    object = { ...object, [value]: a[value] };
  });
  return object;
};

export const intersection = (a: GroceryList, b: GroceryList): string[] =>
  Object.keys(a).filter({}.hasOwnProperty.bind(b));

export const union = (a: GroceryList, b: GroceryList): GroceryList => ({
  ...a,
  ...not(b, a),
});
