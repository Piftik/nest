export interface MealDto {
  id: number;
  name: string;
  teg?: string;
  ingrid: string;
  cooking: string;
  // img?: Blob;
  img?: string;
}
