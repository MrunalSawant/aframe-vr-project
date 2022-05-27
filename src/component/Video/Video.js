/* global AFRAME */
import React, { useEffect, useState } from "react";
import BasicCard from "../UI/BasicCard";

const data = {
    detail: "Martial arts are codified systems and traditions of combat practiced for a number of reasons such as self-defense; military and law enforcement applications; competition; physical, mental, and spiritual development; entertainment; and the preservation of a nation's intangible cultural heritage.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Jackie_Chan_Cannes.jpg"
}

const title = "Marital Art";

function Video() {

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {

        if (!AFRAME.components["cursor-listener2"]) {
            AFRAME.registerComponent('cursor-listener2', {
                init: function () {
                    this.el.addEventListener('mousedown', (e) => {
                        setOpen(true);
                    });
                }
            });
        }

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



    }, []);

    return (
        <div>
            {open ? <BasicCard data={{ title, data }} open={open} onClose={onClose}></BasicCard> : <></>}
            <a-scene>
                <a-assets>
                    <video id="video" loop playsInline webkit-playsinline="true"
                        src="video360.mp4">
                    </video>
                </a-assets>
                <a-image
                    class="cursor-listener2"
                    cursor-listener2
                    src="url(./Info_icon.png)"
                    id="video"
                    cursor="fuse: true; "
                    height="1"
                    width="1"
                    position="1.8 7 -12"
                ></a-image>
                <a-entity
                    cursor="fuse: true; rayOrigin: mouse; "
                    raycaster="objects: .cursor-listener2"
                ></a-entity>
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

export default Video;