export type PictureSizes = "thumbnail" | "card";

export interface Picture {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: Record<
    PictureSizes,
    {
      width: number | null;
      height: number | null;
      mimeType: string | null;
      filesize: number | null;
      filename: string | null;
      url: string | null;
    }
  >;
  createdAt: string;
  updatedAt: string;
  url: string;
}
