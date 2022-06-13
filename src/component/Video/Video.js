/* global AFRAME */
import React, { useEffect, useRef, useState } from "react";
import BasicCard from "../UI/BasicCard";

const data = {
    detail: "Martial arts are codified systems and traditions of combat practiced for a number of reasons such as self-defense; military and law enforcement applications; competition; physical, mental, and spiritual development; entertainment; and the preservation of a nation's intangible cultural heritage.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Jackie_Chan_Cannes.jpg"
}

const title = "Martial Art";

function Video() {

    const [open, setOpen] = useState(false);
    const isVrModeOn = useRef(false);

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {

        document.querySelector("a-scene").addEventListener("enter-vr", function () {
            isVrModeOn.current = true;
            var el = document.createElement("a-cursor");
            document.querySelector("a-camera").appendChild(el);
        });

        document.querySelector("a-scene").addEventListener("exit-vr", function () {
            isVrModeOn.current = false;
            var el = document.getElementById("a-cursor");
            if (el) {
                document.querySelector("a-camera").removeChild(el);
            }
        });

        if (!AFRAME.components["cursor-listener2"]) {
            AFRAME.registerComponent('cursor-listener2', {
                init: function () {
                    this.el.addEventListener('mousedown', (e) => {
                        if (e.target.id === "info") {
                            setOpen(true);
                        } else {
                            setOpen(false);
                        }

                    });

                    this.el.addEventListener("mouseenter", (e) => {
                        if (isVrModeOn.current) {
                            if (e.target.id === "info") {
                                document.querySelector("#martial_art").setAttribute('opacity', 1);
                                document.querySelector("#close_button").setAttribute('opacity', 1);
                            } else if (e.target.id === "close_button") {
                                document.querySelector("#martial_art").setAttribute('opacity', 0);
                                document.querySelector("#close_button").setAttribute('opacity', 0);
                            }
                        }

                    })
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
                onClick: function (e) {
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
                    id="info"
                    height="1"
                    width="1"
                    position="1.8 7 -12"
                ></a-image>
                <a-image
                    src="url(./Martial_Art.png)"
                    id="martial_art"
                    height="1"
                    width="1"
                    scale="8 8 8"
                    opacity="0"
                    position="6.8 3.5 -12"
                ></a-image>
                <a-image
                    src="url(./Close.png)"
                    id="close_button"
                    class="cursor-listener2"
                    cursor-listener2
                    height="1"
                    width="1"
                    opacity="0"
                    position="10 7 -11.99"
                ></a-image>
                <a-entity
                    cursor="fuse: true; rayOrigin: mouse; "
                    raycaster="objects: .cursor-listener2"
                ></a-entity>
                <meta name="apple-mobile-web-app-capable" content="yes"></meta>
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