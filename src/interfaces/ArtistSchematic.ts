type imageObj = {
  size:string;
  '#text':string;
}

export interface ArtistSchematic {
  '@attr'?: {rank: string}
  match?: string
  image: imageObj[]
  listeners?: string;
  mbd?: string;
  name: string;
  streamable: string;
  url: string;
}