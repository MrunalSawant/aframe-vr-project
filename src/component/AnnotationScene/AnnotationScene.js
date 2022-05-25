
/* global AFRAME */
import React from "react";
class AnnotationScene extends React.Component {

    componentDidMount() {
        // Component to change to a sequential color on click.
        AFRAME.registerComponent('cursor-listener', {
            init: function () {
                var lastIndex = -1;
                var COLORS = ['red', 'green', 'blue'];
                this.el.addEventListener('click', function (evt) {
                    lastIndex = (lastIndex + 1) % COLORS.length;
                    this.setAttribute('material', 'color', COLORS[lastIndex]);
                    console.log('I was clicked at: ', evt.detail.intersection.point);
                });
            }
        });
    }

    render() {
        return (
            <div>
                <a-scene>
                    <a-plane position="0 -1 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                    <a-sky color="#ECECEC"></a-sky>
                    <a-entity raycaster="objects:.landscape,.environmentGround,.environmentDressing; far:0.5;"></a-entity>
                    <a-entity gltf-model="url(./scene.gltf)" position="0 2 -4"></a-entity>
                    <a-entity camera look-controls>
                        <a-entity cursor="fuse: true; "
                            position="0 0 -1"
                            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                            material="color: black; shader: flat">
                        </a-entity>
                    </a-entity>

                    <a-entity id="box" cursor-listener geometry="primitive: box" material="color: blue"></a-entity>

                    <a-image
                        class="cursor-listener"
                        src="url(./1.png)"
                        id="Head"
                        cursor="fuse: true; "
                        height="0.25"
                        width="0.25"
                        position="0 3.2 -3.7"
                    ></a-image>
                    <a-image
                        class="cursor-listener"
                        src="url(./2.png)"
                        id="Hand"
                        cursor="fuse: true; "
                        height="0.25"
                        width="0.25"
                        position="0.6 1.5 -3.9"
                    ></a-image>
                    <a-image
                        class="cursor-listener"
                        src="url(./3.png)"
                        id="Femur"
                        cursor="fuse: true; "
                        height="0.2"
                        width="0.2"
                        position="0.2 1.2 -3.9"
                    ></a-image>

                </a-scene>
            </div >
        )
    }
}


export default AnnotationScene;