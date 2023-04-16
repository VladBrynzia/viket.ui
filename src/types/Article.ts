export interface Article {
  id: string;
  author: string;
  date: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  timeToReading: string;
  slug: string;
  keywords: string;
  preventIndexing: boolean;
  SEO: {
    metaTitle: string;
    metaDescription: string;
    SharedImage: {
      alt: string;
      media: {
        data: {
          attributes: {
            url: string;
          }
        }
      }
    }
  };
  authorImage: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
  mainImage: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
}