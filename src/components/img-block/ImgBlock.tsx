import React from 'react';
import {
    View,
    Image,
    PanResponder,
    PanResponderInstance
} from 'react-native';
import {Audio} from 'expo-av';

import {styles} from './styles';

import {PlaybackStatus} from 'expo-av/build/AV';
import {hidePreloader} from '../../redux/dispatchers';

type Props = {};

export class ImgBlock extends React.Component<Props> {
    private panResponder:PanResponderInstance;
    private playbackStatus:PlaybackStatus;
    private startXPosition:number;
    private startYPosition:number;
    private endXPosition:number;
    private endYPosition:number;
    private myComponent:any;
    private readonly soundObject = new Audio.Sound();
    private interval = null;

    constructor(props) {
        super(props);

        this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

        // console.log(this.playbackStatus.isLoaded);

        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,
            // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: async (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                console.log('gesture has started');
                // await this.startPlaying();
                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: async (evt, gestureState) => {
                const isPointerOutOfElement = this.checkIsPointerOutOfElement(gestureState);

                if (this.interval)
                    clearTimeout(this.interval);

                console.log(gestureState);

                this.interval = setTimeout(async () => {
                    await this.pausePlaying();
                }, 2000);

                if (isPointerOutOfElement)
                    await this.pausePlaying();
                else
                    await this.startPlaying();
            },
            onPanResponderRelease: async (evt, gestureState) => {
                await this.stopPlaying();
            },
        });
    }

    private pausePlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (this.playbackStatus.isPlaying)
                await this.soundObject.pauseAsync();
    };

    private stopPlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (!this.playbackStatus.isPlaying)
                await this.soundObject.stopAsync();
    };

    private startPlaying = async () => {
        if (this.playbackStatus.isLoaded) {
            if (!this.playbackStatus.isPlaying) {
                console.log('start');
                await this.soundObject.playAsync();
            }
        }
    };

    private onPlaybackStatusUpdate = async (playbackStatus) => {
        this.playbackStatus = playbackStatus;
    };

    private checkIsPointerOutOfElement = (gestureState) => {
        const {moveX, moveY} = gestureState;

        return moveX < this.startXPosition || moveX > this.endXPosition ||
            moveY < this.startYPosition || moveY > this.endYPosition
    };

    componentDidMount = async () => {
        await this.soundObject.loadAsync(require('../../sound/cat1.mp3'));

        this.myComponent.measure((fx, fy, width, height, px, py) => {
            this.startXPosition = px;
            this.startYPosition = py;

            this.endXPosition = px + width;
            this.endYPosition = py + height;
        });

        setTimeout(() => {
            hidePreloader();
        }, 500);
    };

    render() {
        return <View style={styles.container}>
            <Image
                style={styles.img}
                resizeMode='contain'
                {...this.panResponder.panHandlers}
                ref={view => {
                    this.myComponent = view;
                }}
                source={require('../../img/cat.png')}/>
        </View>;
    }
}
