export class Info {
  Description: string;
  isJSON: boolean;

  constructor(description: string, isJSON: boolean) {
    this.Description = description;
    this.isJSON = isJSON;
  }
}
