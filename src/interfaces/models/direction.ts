import { Directions } from "../../enums/directions";
import { Position } from "./position";

export interface Direction extends Position {
  Z: Directions;
}
