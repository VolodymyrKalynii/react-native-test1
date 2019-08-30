import React from 'react';
import {
    View,
    Image,
    PanResponder,
    PanResponderInstance
} from 'react-native';
import {Audio} from 'expo-av';

import {hidePreloader} from 'red/dispatchers';
import {getElementPosition, checkIsPointerOutOfElement} from './utils';
import {styles} from './styles';

import {PlaybackStatus} from 'expo-av/build/AV';
import {Positions} from './types';

type Props = {};

export class ImgBlock extends React.Component<Props> {
    private panResponder:PanResponderInstance;
    private playbackStatus:PlaybackStatus;
    private component:any;
    private readonly soundObject = new Audio.Sound();
    private userHangOffTouchTimeout = null;
    private soundDowningInterval = null;
    private isPausingStarted = false;
    private positions:Positions;

    constructor(props) {
        super(props);

        this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this.onPanResponderMove
        });
    }

    async componentDidMount() {
        await this.loadSound();
        this.getElementPosition();
        this.startHidingPreloader();
    };

    render() {
        return <View style={styles.container}>
            <Image
                style={styles.img}
                resizeMode='contain'
                {...this.panResponder.panHandlers}
                ref={view => {
                    this.component = view;
                }}
                source={require('_img/cat.png')}/>
        </View>;
    }

    private onPlaybackStatusUpdate = async (playbackStatus) => {
        this.playbackStatus = playbackStatus;
    };

    private onPanResponderMove = async (evt, gestureState) => {
        const isPointerOutOfElement = checkIsPointerOutOfElement(gestureState, this.positions);

        this.runCheckingUserHangOffTouch();

        isPointerOutOfElement
            ? await this.pausePlaying()
            : await this.startPlaying();
    };

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

    private loadSound = async () => {
        await this.soundObject.loadAsync(require('_sound/cat.mp3'));
    };

    private getElementPosition = () => {
        this.positions = getElementPosition(this.component);
    };

    private startHidingPreloader = () => {
        setTimeout(() => {
            hidePreloader();
        }, 500);
    };
}


