export interface Feedbacks {
  id: string;
  attributes: Feedback;
}

export interface Feedback {
  authorName: string;
  authorProfession: string;
  description: string;
  author: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
}