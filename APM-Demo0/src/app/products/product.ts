/* Defines the product entity */

/*
export interface Product {
    id: number | null;
    productName: string;
    productCode: string;
    description: string;
    starRating: number;
}
*/

export class Product {
  constructor(
    public id: number | null,
    public productName: string,
    public productCode: string,
    public description: string,
    public starRating: number
  ) {}
}
