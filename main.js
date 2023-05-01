import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
const scene = new THREE.Scene();
const mouse = new THREE.Vector2();

const target = new THREE.Vector2();

const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );

scene.background = new THREE.Color( 0xADD8E6 );

var pokemon = 0;

const light = new THREE.AmbientLight( 0x404040 ,10); // soft white light

scene.add( light );
camera.position.set(0,4,2);

scene.add(camera);

document.addEventListener( 'mousemove', onMouseMove, false );

const loader = new GLTFLoader();

function onMouseMove( event ) {

    mouse.x = ( event.clientX - windowHalf.x );
    mouse.y = ( event.clientY - windowHalf.x );

}

loader.load( 'Cubone.glb', function ( gltf ) {

    pokemon=gltf.scene;
    pokemon.scale.set(1, 1, 1);
    pokemon.position.y = 4;
    scene.add(pokemon);

},function(xhr){ console.log( (xhr.loaded/xhr.total *100)+"% loaded" ); } , function ( error ) {

    console.error( error );

});


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );


function animation( time ) {

    target.x = ( 1 - mouse.x ) * 0.0002;
    target.y = ( 1 - mouse.y ) * 0.0002;

    camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
    camera.rotation.y += 0.05 * ( target.x - camera.rotation.y );
    //controls.update();
    requestAnimationFrame(animation);
    renderer.render( scene, camera );
    pokemon.rotation.y = time / 1000;

}

animation();