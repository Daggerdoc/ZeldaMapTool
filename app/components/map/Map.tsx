import { useReadOnlyCachedState } from '@rain-cafe/react-utils';
import { MAP_IMAGES, Maps } from '../../constants/maps';
import * as styles from './Map.module.scss';
import { Overlay } from './Overlay';

export type MapProps = {
  map: Maps;
};

export function Map({ map }: MapProps) {
  const image = useReadOnlyCachedState(() => MAP_IMAGES[map], [map]);

  return (
    <div className={styles.map}>
      <img src={image} />

      <Overlay />
    </div>
  );
}
