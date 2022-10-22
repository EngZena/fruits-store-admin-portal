import { FruitModel } from '@core/models/FruitModel';

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
  if (currentPage > 0 && currentPage < 4) {
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
  if (currentPage > 1 && currentPage < 4) {
    const page = currentPage - 1;
    let res = pagination(fullArray, 4, page);
    return {
      pageNumber: page,
      arrayData: res,
    };
  }
  return;
};
