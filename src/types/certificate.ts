export type CertificateType = {
  attributes: CertificateInfoType;
};

export type CertificateInfoType = {
  name: string;
  file: FileType;
};

export type FileType = {
  data: {
    attributes: {
      url: string;
    }
  }
}