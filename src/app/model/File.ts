export interface File {
  id: String;
  name: String;
  description: String;
  author: String;
  originalData?: String;
  originalFormat?: String;
  url?: {
    pes: String;
    sdt: String;
    vip: String;
  };
}
