export interface Output {
  type: 'rover' | 'simulation' | 'invalid' | 'missing board' | 'missing rover';
  value: string;
}
