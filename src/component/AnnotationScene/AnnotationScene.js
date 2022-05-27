/* global AFRAME */
import React, { useEffect, useRef, useState } from "react";
import BasicCard from '../UI/BasicCard';

const dataMap = new Map([
    ["Skull", { detail: "The skull is a bone structure that forms the head in vertebrates. It supports the structures of the face and provides a protective cavity for the brain.[1] The skull is composed of two parts: the cranium and the mandible.[2] In humans, these two parts are the neurocranium and the viscerocranium (facial skeleton) that includes the mandible as its largest bone", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sobo_1909_38.png/800px-Sobo_1909_38.png" }],
    ["Hand", { detail: "A hand is a prehensile, multi-fingered appendage located at the end of the forearm or forelimb of primates such as humans, chimpanzees, monkeys, and lemurs. A few other vertebrates such as the koala (which has two opposable thumbs on each hand and fingerprints extremely similar to human fingerprints) are often described as having hands instead of paws on their front limbs", image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/3D_Medical_Animation_Human_Wrist.jpg" }],
    ["Femur", { detail: "The femur (/ˈfiːmər/; pl. femurs or femora /ˈfɛmərə/),[1][2] or thigh bone, is the proximal bone of the hindlimb in tetrapod vertebrates. The head of the femur articulates with the acetabulum in the pelvic bone forming the hip joint, while the distal part of the femur articulates with the tibia (shinbone) and patella (kneecap), forming the knee joint", image: "https://cdn.britannica.com/92/99192-050-52E7AB99/view-femur.jpg" }]]);

function AnnotationScene() {

    const [data, setData] = useState(undefined);
    const [title, setTitle] = useState("");
    const isVrModeOn = useRef(false);
    const [isOpen, setOpen] = useState(false);

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

        //cursor-listener
        if (!AFRAME.components['cursor-listener']) {
            AFRAME.registerComponent('cursor-listener', {
                init: function () {
                    this.el.addEventListener('mousedown', (e) => {

                        if (dataMap.has(e.target.id)) {
                            setOpen(true);
                            setTitle(e.target.id);
                            setData(dataMap.get(e.target.id));
                        }

                    });

                    this.el.addEventListener('mouseenter', (e) => {
                        if (isVrModeOn.current) {
                            if (dataMap.has(e.target.id)) {
                                document.querySelector("#vrImage").setAttribute('src', `url(${e.target.id}.png)`);
                                document.querySelector("#vrImage").setAttribute('opacity', 1);
                                document.querySelector("#close").setAttribute('opacity', 1);
                            } else if (e.target.id === "close") {
                                document.querySelector("#vrImage").setAttribute('opacity', 0);
                                document.querySelector("#close").setAttribute('opacity', 0);
                            }

                        }

                    });
                }
            });
        }
    }, []);


    return (
        <div>
            {isOpen ? <BasicCard data={{ title, data }} open={isOpen} onClose={onClose}></BasicCard> : <></>}
            <a-scene>
                <a-assets>
                    <img id="sky" src="background.jpg" alt=""></img>
                </a-assets>
                <a-sky src="#sky"></a-sky>
                <a-light type="directional" position="0 30 10" rotation="-90 0 0" target="#directionaltarget" intensity="1.0">
                    <a-entity id="directionaltarget" position="0 20 -10"></a-entity>
                </a-light>
                <a-entity id="mouseCursor" cursor="rayOrigin: mouse" raycaster="objects: .intersectable"></a-entity>
                <a-plane position="0 -1 -4" rotation="-90 0 0" width="4" height="4" color="#a3bbe2" opacity="0.4"></a-plane>
                <a-entity gltf-model="url(./scene.gltf)" position="0 2 -4"></a-entity>
                <a-entity
                    cursor="fuse: true; rayOrigin: mouse; "
                    raycaster="objects: .cursor-listener"
                ></a-entity>
                <a-camera></a-camera>
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
                    src="url(3.png)"
                    height="0.2"
                    width="0.2"
                    position="0.2 1.2 -3.9"
                ></a-image>
                <a-image
                    id="vrImage"
                    class="cursor-listener"
                    cursor-listener
                    src=""
                    height="1"
                    width="1"
                    opacity="0"
                    position="0.9 2 -2"
                ></a-image>
                <a-image
                    id="close"
                    class="cursor-listener"
                    cursor-listener
                    src="url(./Close.png)"
                    height="0.1"
                    width="0.1"
                    opacity="0"
                    position="1.35 2.45 -1.999"
                ></a-image>

            </a-scene>
        </div >
    )
}

export default AnnotationScene;