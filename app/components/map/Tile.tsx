import * as styles from './Tile.module.scss';

export type TileProps = {
  x: number;
  y: number;
};

export function Tile({ x, y }: TileProps) {
  return <div className={styles.tile} />;
}
