import {
  EnglishKannadaLookupType,
  FilterType,
  Grocery,
  GroceryList,
  Language,
} from '../redux/model.interface';
import engKaLookupJson from '../assets/eng-ka-lookup.json';

const engKaLookup: EnglishKannadaLookupType = engKaLookupJson;

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

export const searchAndFilter = (
  itemObject: Grocery,
  searchValue: string,
  filterValue: FilterType | undefined,
) => {
  if (searchValue.length < 2) {
    return true;
  }
  if (
    searchValue &&
    !filterValue &&
    (itemObject.name[Language.english].toLowerCase().includes(searchValue) ||
      itemObject.name[Language.kannada].toLowerCase().includes(searchValue) ||
      engKaLookup.category[itemObject.category].english
        .toLowerCase()
        .includes(searchValue) ||
      engKaLookup.category[itemObject.category].kannada
        .toLowerCase()
        .includes(searchValue) ||
      engKaLookup.subCategory[itemObject.subCategory].english
        .toLowerCase()
        .includes(searchValue) ||
      engKaLookup.subCategory[itemObject.subCategory].kannada
        .toLowerCase()
        .includes(searchValue) ||
      engKaLookup.measurement[itemObject.measurement].english
        .toLowerCase()
        .includes(searchValue) ||
      engKaLookup.measurement[itemObject.measurement].kannada
        .toLowerCase()
        .includes(searchValue))
  ) {
    return true;
  }
  if (
    searchValue &&
    filterValue &&
    filterValue !== FilterType.name &&
    filterValue !== FilterType.quantity
  ) {
    const typeValue = itemObject[filterValue];
    const languageKeyValuePair = Object.entries(engKaLookup[filterValue]).find(
      ([key]) => key === typeValue,
    );
    if (languageKeyValuePair) {
      return (
        languageKeyValuePair[1].english.toLowerCase().includes(searchValue) ||
        languageKeyValuePair[1].kannada.toLowerCase().includes(searchValue)
      );
    }
  }
  if (
    searchValue &&
    filterValue &&
    filterValue === FilterType.name &&
    (itemObject.name[Language.english].toLowerCase().includes(searchValue) ||
      itemObject.name[Language.kannada].toLowerCase().includes(searchValue))
  ) {
    return true;
  }
  return false;
};
