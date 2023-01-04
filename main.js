const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF} from "/libs/loader.js"

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '/assets/targets.mind',
            uiScanning: "#scanning" 
          });
      
          const {renderer, scene, camera} = mindarThree;

          const light = new THREE.HemisphereLight(0xFFFFFF, 0xbbbbff, 1);
          scene.add(light);

          const anchor = mindarThree.addAnchor(0);

          const gltf = await loadGLTF("/assets/pet.glb");
          gltf.scene.scale.set(5, 5, 5);
          gltf.scene.position.set(0, -0.4, 0);
          anchor.group.add(gltf.scene);

          //model animations
          const mixer = new THREE.AnimationMixer(gltf.scene);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
          
          const clock = new THREE.Clock();
          
          await mindarThree.start();
         
          renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();
            mixer.update(delta);  
            renderer.render(scene, camera);
          });
    }
    start();
    
});