import React from 'react';
import {
    View,
    Image,
    PanResponder,
    PanResponderInstance
} from 'react-native';
import {Audio} from 'expo-av';

import {hidePreloader} from '../../redux/dispatchers';
import {styles} from './styles';

import {PlaybackStatus} from 'expo-av/build/AV';

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
    private userHangOffTouchTimeout = null;
    private soundDowningInterval = null;
    private isPausingStarted = false;

    constructor(props) {
        super(props);

        this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: async (evt, gestureState) => {
                const isPointerOutOfElement = this.checkIsPointerOutOfElement(gestureState);

                // console.log(gestureState);

                this.runCheckingUserHangOffTouch();

                isPointerOutOfElement
                    ? await this.pausePlaying()
                    : await this.startPlaying();
            },
        });
    }

    private runCheckingUserHangOffTouch = () => {
        if (this.userHangOffTouchTimeout)
            clearTimeout(this.userHangOffTouchTimeout);

        this.userHangOffTouchTimeout = setTimeout(async () => {
            await this.pausePlaying();
        }, 1000);
    };

    private pausePlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (this.playbackStatus.isPlaying && !this.isPausingStarted)
                this.startPausingAudio();
    };

    private startPausingAudio = () => {
        this.soundDowningInterval = setInterval(async () => {
            const newVolume = this.getNewVolume();

            newVolume > 0
                ? await this.setVolume(newVolume)
                : await this.finishSoundDowning();
        }, 500);

        this.isPausingStarted = true;

    };

    private getNewVolume = () => {
        // @ts-ignore
        const {volume} = this.playbackStatus;

        return +volume.toFixed(1) - 0.1;
    };

    private setVolume = async (volume) => {
        await this.soundObject.setVolumeAsync(volume);
    };

    private finishSoundDowning = async () => {
        clearInterval(this.soundDowningInterval);
        await this.soundObject.stopAsync();
        this.isPausingStarted = false;
    };

    private stopPlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (!this.playbackStatus.isPlaying)
                await this.soundObject.stopAsync();
    };

    private startPlaying = async () => {
        if (this.playbackStatus.isLoaded)
            if (!this.playbackStatus.isPlaying) {
                await this.soundObject.setVolumeAsync(1);
                await this.soundObject.playAsync();
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

    async componentDidMount() {
        await this.soundObject.loadAsync(require('../../sound/cat.mp3'));

        this.getElementPosition();

        setTimeout(() => {
            hidePreloader();
        }, 500);
    };

    private getElementPosition = () => {
        this.myComponent.measure((fx, fy, width, height, px, py) => {
            this.startXPosition = px;
            this.startYPosition = py;

            this.endXPosition = px + width;
            this.endYPosition = py + height;
        });
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


