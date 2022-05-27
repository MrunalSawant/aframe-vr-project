/* global AFRAME */
import React from "react";
import BasicCard from "../UI/BasicCard";

class Video extends React.Component {
    componentDidMount() {

        if (!AFRAME.components["play-on-click"]) {
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
        }

        if (!AFRAME.components["hide-on-play"]) {
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
    }

    render() {
        return (
            <div>
                <BasicCard data={{ title: "video", value: "value" }}></BasicCard>
                <a-scene>
                    <a-assets>
                        <video id="video" loop playsInline webkit-playsinline="true"
                            src="video360.mp4">
                        </video>
                    </a-assets>
                    <a-image
                        class="cursor-listener"
                        src="url(./Info_icon.png)"
                        id="video"
                        cursor="fuse: true; "
                        height="1"
                        width="1"
                        position="0 10 -12"
                    ></a-image>
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
            </div >

        )
    }
}

export default Video;