export interface ProductAttributeInterface {
  name: string;
  value: string | number;
}

export interface ProductAttributePayloadInterface {
  name: string;
  values?: [string];
}
