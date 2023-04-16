export interface ProjectOption {
  image: string;
  title: string;
  description: string;
};

export interface Project {
  id: string;
  attributes: {
    projectName: string;
    projectLink: string;
    projectTitle: string;
    description: string;
    firstShortInfo: string;
    secondShortInfo: string;
    firstShortNumber: string;
    secondShortNumber: string;
    projectImage: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }
};