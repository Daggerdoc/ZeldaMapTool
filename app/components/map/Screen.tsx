import classNames from 'classnames';
import * as styles from './Screen.module.scss';
import { useCachedState, useReadOnlyCachedState } from '@rain-cafe/react-utils';
import { Tile } from './Tile';
import { ReactNode } from 'react';

export type ScreenProps = {
  x: number;
  y: number;
  visible: boolean;
};

export const TILE_WIDTH = 16;
export const TILE_HEIGHT = 11;

export function Screen({ x, y, visible: externallyVisible }: ScreenProps) {
  const [visible, setVisible] = useCachedState(() => externallyVisible, [externallyVisible]);
  const tiles: ReactNode[] = useReadOnlyCachedState(() => {
    return Array(TILE_WIDTH * TILE_HEIGHT)
      .fill(null)
      .map((_, index) => {
        const x = index % TILE_WIDTH;
        const y = Math.floor(index / TILE_HEIGHT);
        return <Tile x={x} y={Math.floor(y)} />;
      });
  }, []);

  return (
    <div className={classNames(styles.screen, visible && styles.visible)} onDoubleClick={() => setVisible(!visible)}>
      {visible ? (
        tiles
      ) : (
        <div className={styles.coords}>
          {x}, {y}
        </div>
      )}
    </div>
  );
}
