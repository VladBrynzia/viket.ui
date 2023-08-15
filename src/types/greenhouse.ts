export type GreenhouseType = {
  attributes: GreenhouseInfoType;
};

export type GreenhouseInfoType = {
  description: string;
  sliderImages: SliderType;
};

export type SliderType = {
  data: {
    attributes: {
      url: string;
    }
  }[]
}