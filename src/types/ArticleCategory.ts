import { Article } from "./Article";

export interface ArticleCategory {
  attributes: {
    categoryId: string;
    categoryName: string;
    subcategory: [{
      name: string
      articles: {
        data: {
          attributes: {
            title: string;
          }
        }
      }
    }]
    articles: {
      data: Article[];
    }
  }
}
