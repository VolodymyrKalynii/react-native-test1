import {Positions} from '../types';

export const checkIsPointerOutOfElement = (gestureState, positions:Positions):boolean => {
    const {moveX, moveY} = gestureState;
    const {startXPosition, startYPosition, endXPosition, endYPosition} = positions;

    return moveX < startXPosition || moveX > endXPosition ||
        moveY < startYPosition || moveY > endYPosition
};