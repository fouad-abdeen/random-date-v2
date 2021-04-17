export interface I_Message {
  id: string;
  name: string;
  message: string;
}

export interface I_Modal {
  className: string;
  show: boolean;
  onHide(param: boolean): void;
}
