import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";

import React from "react";
import { ShopPopup } from "../components/ShopPopup/ShopPopup";
import { ShopItem } from "../types/product";
import { useLocalStorage } from "../hooks/useLocalStorage";

type PolicyContextType = {
  isShopOpen: boolean;
  toggleShop: () => void;
  addProductToShop: (product: ShopItem) => void;
  removeProductFromShop: (product: ShopItem) => void;
  isMarkerVisible: boolean;
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
  const [products, setProducts] = useState<ShopItem[]>([]);
  const isMarkerVisible = !!products.length;

  const productsToShow = useMemo(() => {
    const uniqueShopItems: UniqueShopItem[] = products.reduce((acc, item) => {
      const { name } = item;
      const existingItem = acc.find(
        (uniqueItem) => uniqueItem.item.name === name
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

  const addProductToShop = (product: ShopItem) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    setYourProducts(JSON.stringify(newProducts));
  };

  const removeProductFromShop = (product: ShopItem) => {
    const index = products.findIndex((p) => p === product);
    if (index !== -1) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
      setYourProducts(JSON.stringify(newProducts));
    }
  };

  return (
    <ShopPopupContext.Provider
      value={{
        isShopOpen,
        toggleShop,
        addProductToShop,
        removeProductFromShop,
        isMarkerVisible,
      }}
    >
      {isShopOpen && (
        <ShopPopup
          isShopOpen={isShopOpen}
          onClose={toggleShop}
          products={productsToShow}
        />
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
  } = useContext(ShopPopupContext);

  return {
    isShopOpen,
    toggleShop,
    addProductToShop,
    removeProductFromShop,
    isMarkerVisible,
  };
};
