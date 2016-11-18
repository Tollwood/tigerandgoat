import { Position } from './position';

export abstract class Meeple{
  id: number;
  position : Position;
  abstract color : string;
}
