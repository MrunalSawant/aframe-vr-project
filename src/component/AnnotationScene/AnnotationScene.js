/* global AFRAME */
import React, { useEffect, useState } from "react";
import BasicCard from './Annotation';

const dataMap = new Map([["Skull", "The skull is a bone structure that forms the head in vertebrates. It supports the structures of the face and provides a protective cavity for the brain.[1] The skull is composed of two parts: the cranium and the mandible.[2] In humans, these two parts are the neurocranium and the viscerocranium (facial skeleton) that includes the mandible as its largest bone"], ["Hand", "A hand is a prehensile, multi-fingered appendage located at the end of the forearm or forelimb of primates such as humans, chimpanzees, monkeys, and lemurs"], ["Femur", "The femur (/ˈfiːmər/; pl. femurs or femora /ˈfɛmərə/),[1][2] or thigh bone, is the proximal bone of the hindlimb in tetrapod vertebrates. The head of the femur articulates with the acetabulum in the pelvic bone forming the hip joint, while the distal part of the femur articulates with the tibia (shinbone) and patella (kneecap), forming the knee joint"]]);
function AnnotationScene() {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [isVrModeOn, setVrModeOn] = useState(false);

    useEffect(() => {

        document.querySelector("a-scene").addEventListener("enter-vr", function () {
            console.log('VR MODE ON');
            setVrModeOn(true);
        });

        document.querySelector("a-scene").addEventListener("exit-vr", function () {
            console.log('VR MODE OFF');
            setVrModeOn(false);
        });

        //cursor-listener
        if (!AFRAME.components['cursor-listener']) {
            AFRAME.registerComponent('cursor-listener', {
                init: function () {
                    this.el.addEventListener('mousedown', (evt) => {
                        setTitle(evt.srcElement.id);
                        setValue(dataMap.get(evt.srcElement.id));
                    });
                }
            });
        }
    }, []);


    return (
        <div>
            <BasicCard data={{ title, value }} ></BasicCard>
            <a-scene>
                <a-assets>
                    <img id="sky" src="background.jpg" alt=""></img>
                </a-assets>
                <a-sky src="#sky"></a-sky>
                <a-light type="directional" position="0 30 10" rotation="-90 0 0" target="#directionaltarget" intensity="1.0">
                    <a-entity id="directionaltarget" position="0 20 -10"></a-entity>
                </a-light>

                <a-plane position="0 -1 -4" rotation="-90 0 0" width="4" height="4" color="#a3bbe2" opacity="0.4"></a-plane>
                <a-entity gltf-model="url(./scene.gltf)" position="0 2 -4"></a-entity>
                <a-entity camera look-controls>
                    <a-entity cursor="fuse: true; fuseTimeout: 500"
                        position="0 0 -1"
                        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                        material="color: black; shader: flat">
                    </a-entity>
                </a-entity>
                <a-entity
                    cursor="fuse: true; rayOrigin: mouse; fuseTimeout:500"
                    raycaster="objects: .cursor-listener"
                ></a-entity>
                <a-image
                    id="Skull"
                    class="cursor-listener"
                    cursor-listener
                    src="url(./1.png)"
                    height="0.25"
                    width="0.25"
                    position="0 3.2 -3.7"
                ></a-image>
                <a-image
                    id="Hand"
                    class="cursor-listener"
                    cursor-listener
                    src="url(./2.png)"
                    height="0.25"
                    width="0.25"
                    position="0.6 1.5 -3.9"
                ></a-image>
                <a-image
                    id="Femur"
                    class="cursor-listener"
                    cursor-listener
                    src="url(./3.png)"
                    height="0.2"
                    width="0.2"
                    position="0.2 1.2 -3.9"
                ></a-image>
            </a-scene>
        </div >
    )

}


export default AnnotationScene;