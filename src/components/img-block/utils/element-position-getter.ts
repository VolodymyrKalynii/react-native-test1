import {Positions} from '../types';

export const getElementPosition = (component):Positions => {
    const positions = {
        startXPosition: null,
        startYPosition: null,
        endXPosition: null,
        endYPosition: null
    };

    component.measure((fx, fy, width, height, px, py) => {
        positions.startXPosition = px;
        positions.startYPosition = py;
        positions.endXPosition = px + width;
        positions.endYPosition = py + height;
    });

    return positions;
};