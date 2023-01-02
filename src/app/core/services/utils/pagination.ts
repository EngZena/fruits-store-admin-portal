import { FruitModel } from '@core/models/FruitModel';

export const getTotalNumberOfPages = (number_of_content: number) => {
  const result = number_of_content / 4;
  if (Number.isInteger(result)) {
    return result;
  } else {
    return Math.trunc(result) + 1;
  }
};

export const pagination = (
  array: FruitModel[],
  page_size: number,
  page_number: number
) => {
  return (
    array && array.slice((page_number - 1) * page_size, page_number * page_size)
  );
};

export const NextPage = (currentPage: number, fullArray: FruitModel[]) => {
  const number_of_pages = getTotalNumberOfPages(fullArray.length);
  if (currentPage > 0 && currentPage < number_of_pages) {
    const page = currentPage + 1;
    let res = pagination(fullArray, 4, page);
    return {
      pageNumber: page,
      arrayData: res,
    };
  }
  return;
};

export const PreviousPage = (currentPage: number, fullArray: FruitModel[]) => {
  const number_of_pages = getTotalNumberOfPages(fullArray.length);
  if (currentPage > 1 && currentPage <= number_of_pages) {
    const page = currentPage - 1;
    let res = pagination(fullArray, 4, page);
    return {
      pageNumber: page,
      arrayData: res,
    };
  }
  return;
};
