import * as THREE from "three";
import {GLTFLoader} from "three/addons";

(() => {
    const scene = new THREE.Scene();
    const mousePos = new THREE.Vector2();

    const loader = new GLTFLoader();
    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    camera.lookAt(0, 0, 0);
    camera.position.z = 900;
    camera.position.y = 200;

    const ambientLight = new THREE.AmbientLight(0xffffff);

    const staticLight = new THREE.DirectionalLight(0xffffff, 2);
    staticLight.lookAt(0,0,0)
    staticLight.position.set(0,-300,0)

    const directionalLight = new THREE.DirectionalLight(0xaa2244, 10);
    directionalLight.position.set(400, 100, -100);

    const directionalLight2 = new THREE.DirectionalLight(0x0000ff, 10);
    directionalLight2.position.set(-400, -100, 100);
    directionalLight2.lookAt(0, 0, 0);

    scene.add(directionalLight, directionalLight2, ambientLight,staticLight);

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, powerPreference: "high-performance"});
    const mainContainer = document.querySelector(".container");
    renderer.setSize(window.innerWidth, window.innerHeight);
    mainContainer.appendChild(renderer.domElement);

    let model;
    loader.load("/images/soulless/scene.gltf", (gltf) => {
            model = gltf.scene;
            model.position.z = -100;
            scene.add(model);
        },
        (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
        (err) => console.log("ERROR:", err));

    window.addEventListener("mousemove", (e) => {
        mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    });

    let angle = 0
    function animate() {
        renderer.render(scene, camera);
        if (model) {
            const maxRotation = Math.PI / 2; // Limits the rotation to 45 degrees left/right
            model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, mousePos.x * maxRotation, 0.1);
        }
        const radius = 400; // Adjust the radius of rotation
        angle += 0.02; // Rotation speed

        directionalLight.position.x = Math.cos(angle) * radius;
        directionalLight.position.z = Math.sin(angle) * radius;

        directionalLight2.position.z = Math.cos(angle) * radius;
        directionalLight2.position.x = Math.sin(angle) * radius;

        directionalLight.lookAt(0, 0, 0);
        directionalLight2.lookAt(0, 0, 0);
    }
    renderer.setAnimationLoop(animate);
})();
