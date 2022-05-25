/* global AFRAME */
import React from "react";

class Video extends React.Component {
    componentDidMount() {

        AFRAME.registerComponent('play-on-click', {
            init: function () {
                this.onClick = this.onClick.bind(this);
            },
            play: function () {
                window.addEventListener('click', this.onClick);
            },
            pause: function () {
                window.removeEventListener('click', this.onClick);
            },
            onClick: function (evt) {
                var videoEl = this.el.getAttribute('material').src;
                if (!videoEl) { return; }
                this.el.object3D.visible = true;
                videoEl.play();
            }
        });

        AFRAME.registerComponent('hide-on-play', {
            schema: { type: 'selector' },
            init: function () {
                this.onPlaying = this.onPlaying.bind(this);
                this.onPause = this.onPause.bind(this);
                this.el.object3D.visible = !this.data.playing;
            },
            play: function () {
                if (this.data) {
                    this.data.addEventListener('playing', this.onPlaying);
                    this.data.addEventListener('pause', this.onPause);
                }
            },
            pause: function () {
                if (this.data) {
                    this.data.removeEventListener('playing', this.onPlaying);
                    this.data.removeEventListener('pause', this.onPause);
                }
            },
            onPlaying: function (evt) {
                this.el.object3D.visible = false;
            },
            onPause: function (evt) {
                this.el.object3D.visible = true;
            }
        });

    }

    render() {
        return (
            <a-scene>
                <a-assets>
                    <video id="video" loop crossOrigin="anonymous" playsInline webkit-playsinline="true"
                        src="https://bitmovin-a.akamaihd.net/content/playhouse-vr/progressive.mp4">
                    </video>
                </a-assets>
                <a-videosphere rotation="0 -90 0" src="#video" play-on-click>
                </a-videosphere>

                <a-camera>
                    <a-entity position="0 0 -1.5" text="align:center;
                width:6;
                wrapCount:100;
                color: white;
                value: Click or tap to start video" hide-on-play="#video">
                    </a-entity>
                </a-camera>
            </a-scene>
        )
    }
}

export default Video;