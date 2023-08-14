import quest1 from '../../assets/quest1.png';
import quest2 from '../../assets/quest2.png';

export enum Maps {
  QUEST1,
  QUEST2,
}

export const MAP_IMAGES: {
  [key in Maps]: string;
} = {
  [Maps.QUEST1]: quest1,
  [Maps.QUEST2]: quest2,
};
