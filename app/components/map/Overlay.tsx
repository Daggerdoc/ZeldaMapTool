import { useReadOnlyCachedState } from '@rain-cafe/react-utils';
import * as styles from './Overlay.module.scss';
import { Screen } from './Screen';
import { ReactNode } from 'react';
import { isScreenVisible } from '../../utils/screens';

export const SCREEN_WIDTH = 16;
export const SCREEN_HEIGHT = 8;

export const DEFAULT_VISIBLE_SCREENS = ['5-10,7'];

export function Overlay() {
  const screens: ReactNode[] = useReadOnlyCachedState(() => {
    return Array(SCREEN_WIDTH * SCREEN_HEIGHT)
      .fill(null)
      .map((_, index) => {
        const x = index % SCREEN_WIDTH;
        const y = Math.floor(index / SCREEN_WIDTH);
        return <Screen x={x} y={Math.floor(y)} visible={isScreenVisible(x, y, DEFAULT_VISIBLE_SCREENS)} />;
      });
  }, []);

  return <div className={styles.overlay}>{screens}</div>;
}
