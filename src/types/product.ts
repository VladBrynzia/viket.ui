export type Product = {
  attributes: ProductInfoType;
};

export type ShopItem = {
  name: string;
  thickness: string;
  sheetOption: SheetOption;
  slug: string;
  mainImage: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
}

export type ProductInfoType = {
  name: string;
  description: string;
  haveInStock: boolean;
  color: string;
  thickness: string;
  slug: string;
  mainImage: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
  images: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
  sheetOption: SheetOption[]
};

export type SheetOption = {
  pricePerMeter: number;
  totalPrice: number;
  listSize: string;
  haveInStock: boolean;
};

export type ProductCategory = {
  attributes: {
    categoryName: string;
    categoryId: string;
    products: {
      data: {
        attributes: {
          name: string;
          haveInStock: boolean;
          mainImage: {
            data: {
              attributes: {
                url: string;
              }
            }
          }
        }
      }
    }
  }
}