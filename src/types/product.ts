export type Product = {
  id: string;
  attributes: ProductInfoType;
};

export type ProductInfoType = {
  name: string;
  description: string;
  haveInStock: boolean;
  topSellers: boolean;
  mainImage: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
  slug: string;
  characteristics: string;
  productImages: {
    data: {
      attributes: {
        url: string;
      }
    }[]
  };
  policarbonSheetOptions: PolicarbonSheetOptionsType[];
  accessoriesSheetOptions: AccessoriesSheetOptionsType[];
};

export type PolicarbonSheetOptionsType = {
  haveInStock: boolean;
  listSize: string;
  warrantyText: string;
  wholesalePriceInfo: string;
  color: string;
  totalPrice: number;
  pricePerMeter: number;
  thickness: number;
}

export type AccessoriesSheetOptionsType = {
  haveInStock: boolean;
  warrantyText: string;
  wholesalePriceInfo: string;
  accessoriesType: AccessoriesType;
  totalPrice: number;
  color: string;
  itemLength: string;
}

export enum AccessoriesType {
  Pieces = 'pieces',
  Meters = 'meters',
}


export type ProductCategory = {
  attributes: {
    categoryName: string;
    categoryId: string;
    products: {
      data: {
        attributes: {
          name: string;
          slug: string;
        }
      }
    }
  }
}

export type ShopItem = {
  name: string;
  sheetOption: any;
  slug: string;
  mainImage: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
}