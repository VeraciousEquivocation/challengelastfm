type imageObj = {
  size:string;
  '#text':string;
}

export interface ArtistSchematic {
  image: imageObj[]
  listeners: string;
  mbd: string;
  name: string;
  streamable: string;
  url: string;
}