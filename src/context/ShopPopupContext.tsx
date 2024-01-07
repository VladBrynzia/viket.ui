import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import toast from "react-hot-toast";
import React from "react";
import { ShopPopup } from "../components/ShopPopup/ShopPopup";
import { SheetOption, ShopItem } from "../types/product";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { OrderPopup } from "../components/OrderPopup/OrderPopup";

type PolicyContextType = {
  isShopOpen: boolean;
  toggleShop: () => void;
  addProductToShop: (product: ShopItem, count: number) => void;
  removeProductFromShop: (product: ShopItem) => void;
  isMarkerVisible: boolean;
  clearShop: () => void;
  totalAmount: number;
  toggleOrder: () => void;
  isOrderOpen: boolean;
};

export interface UniqueShopItem {
  item: ShopItem;
  count: number;
}

const ShopPopupContext = createContext({} as PolicyContextType);

export const ShopPopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [yourProducts, setYourProducts] = useLocalStorage<string>(
    "products",
    ""
  );
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [products, setProducts] = useState<ShopItem[]>([]);
  const isMarkerVisible = !!products.length;

  const isEqualSheetOption = (a: SheetOption, b: SheetOption): boolean => {
    return (
      a.pricePerMeter === b.pricePerMeter &&
      a.totalPrice === b.totalPrice &&
      a.listSize === b.listSize &&
      a.haveInStock === b.haveInStock
    );
  };

  const productsToShow = useMemo(() => {
    const uniqueShopItems: UniqueShopItem[] = products.reduce((acc, item) => {
      const existingItem = acc.find(
        (uniqueItem) =>
          uniqueItem.item.slug === item.slug &&
          isEqualSheetOption(uniqueItem.item.sheetOption, item.sheetOption)
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        acc.push({
          item,
          count: 1,
        });
      }
      return acc;
    }, [] as UniqueShopItem[]);

    return uniqueShopItems;
  }, [products]);

  useEffect(() => {
    if (yourProducts) {
      setProducts(JSON.parse(yourProducts));
    }
  }, [yourProducts]);

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  const toggleOrder = () => {
    setIsOrderOpen(!isOrderOpen);
    setIsShopOpen(!isShopOpen);
  };

  const addProductToShop = (product: ShopItem, count: number) => {
    const newProducts = [...products, ...Array(count).fill(product)]
    setProducts(newProducts);
    console.log("====================================");
    console.log(newProducts, yourProducts);
    console.log("====================================");
    setYourProducts(JSON.stringify(newProducts));
    if (!isShopOpen) {
      toast.success("Товар добавлен в корзину!");
    }
  };

  const removeProductFromShop = (product: ShopItem) => {
    const index = products.findIndex((p) => p === product);
    if (index !== -1) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
      setYourProducts(JSON.stringify(newProducts));
      if (newProducts.length === 0) {
        toast.error("Вы удалили все товары из корзины!");
      }
    }
  };

  const clearShop = () => {
    setProducts([]);
    setYourProducts("");
  };

  const totalAmount = useMemo(() => {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += product.sheetOption.totalPrice;
    }
    return totalPrice;
  }, [products]);

  return (
    <ShopPopupContext.Provider
      value={{
        isShopOpen,
        toggleShop,
        addProductToShop,
        removeProductFromShop,
        isMarkerVisible,
        clearShop,
        totalAmount,
        toggleOrder,
        isOrderOpen,
      }}
    >
      {isShopOpen && (
        <ShopPopup
          isShopOpen={isShopOpen}
          onClose={toggleShop}
          products={productsToShow}
        />
      )}
      {isOrderOpen && (
        <OrderPopup order={productsToShow} totalAmount={totalAmount} />
      )}
      {children}
    </ShopPopupContext.Provider>
  );
};

export const useShopContext = () => {
  const {
    isShopOpen,
    toggleShop,
    addProductToShop,
    removeProductFromShop,
    isMarkerVisible,
    clearShop,
    totalAmount,
    toggleOrder,
    isOrderOpen,
  } = useContext(ShopPopupContext);

  return {
    isShopOpen,
    toggleShop,
    addProductToShop,
    removeProductFromShop,
    isMarkerVisible,
    clearShop,
    totalAmount,
    toggleOrder,
    isOrderOpen,
  };
};
