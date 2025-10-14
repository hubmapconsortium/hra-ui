import { Matrix4, toRadians } from '@math.gl/core';

const gray$1 = [204, 204, 204, 255];
const red$2 = [213, 0, 0, 255];
const green$2 = [29, 204, 101, 255];
const blue$2 = [41, 121, 255, 255];
/**
 * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
 * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
 * @param includeLetters whether to show the keyboard letters associated with the origin points
 * @param centered whether to center the organ at the origin point
 * @returns a set of scene nodes for the body-ui
 */
function getOriginScene(node, includeLetters = false, centered = false) {
    const sceneWidth = node.x_dimension / 1000;
    const sceneHeight = node.y_dimension / 1000;
    const sceneDepth = node.z_dimension / 1000;
    const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.05;
    const lineRadius = originRadius * 0.1;
    const globalTranslation = centered ? [sceneWidth, sceneHeight, sceneDepth].map((n) => n * -0.5) : [0, 0, 0];
    return [
        // Origin Sphere
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginSphere',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'sphere',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate(globalTranslation).scale(originRadius),
            color: gray$1,
        },
        // Origin X Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginX',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([sceneWidth / 2, 0, 0])
                .rotateZ(toRadians(-90))
                .scale([lineRadius, sceneWidth, lineRadius]),
            color: red$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([sceneWidth, 0, 0])
                .rotateZ(toRadians(-90))
                .scale([originRadius, originRadius * 3, originRadius]),
            color: red$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXALabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'A',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([-originRadius * 2, 0, 0])
                .scale(originRadius),
            color: red$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXDLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'D',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([sceneWidth + originRadius * 2, 0, 0])
                .scale(originRadius),
            color: red$2,
        },
        // Origin Y Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginY',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([0, sceneHeight / 2, 0])
                .scale([lineRadius, sceneHeight, lineRadius]),
            color: green$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([0, sceneHeight, 0])
                .scale([originRadius, originRadius * 3, originRadius]),
            color: green$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYSLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'S',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([originRadius * 1.5, originRadius * 1.5, 0])
                .scale(originRadius),
            color: green$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYWLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'W',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([0, sceneHeight + originRadius * 2, 0])
                .scale(originRadius),
            color: green$2,
        },
        // Origin Z Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([0, 0, sceneDepth / 2])
                .rotateX(toRadians(90))
                .scale([lineRadius, sceneDepth, lineRadius]),
            color: blue$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([0, 0, sceneDepth])
                .rotateX(toRadians(90))
                .scale([originRadius, originRadius * 3, originRadius]),
            color: blue$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZQLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'Q',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([originRadius * 1.5, -originRadius * 1.5, 0])
                .scale(originRadius),
            color: blue$2,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZELabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'E',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate(globalTranslation)
                .translate([0, 0, sceneDepth + originRadius * 2])
                .scale(originRadius),
            color: blue$2,
        },
    ].filter((n) => (includeLetters && n.geometry === 'text' && n.text) || !n.text);
}

const gold = [240, 183, 98, 255];
const red$1 = [213, 0, 0, 255];
const green$1 = [29, 204, 101, 255];
const blue$1 = [41, 121, 255, 255];
/**
 * Create a set of scene nodes for the body-ui to show the probing sphere and lines around it
 * for a given spatial search.
 * @param node the Spatial Entity (usually a reference organ) that the sphere is probing into
 * @param sphere the Spatial Search that defines where and how big the probing sphere is
 * @returns a set of scene nodes for the body-ui
 */
function getProbingSphereScene(node, sphere) {
    const sceneWidth = node.x_dimension / 1000;
    const sceneHeight = node.y_dimension / 1000;
    const sceneDepth = node.z_dimension / 1000;
    const defaultSphereRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.07;
    const sphereLineRadius = defaultSphereRadius * 0.05;
    const sphereLineLength = defaultSphereRadius * 2;
    const sphereConeRadius = sphereLineRadius * 4;
    if (!sphere) {
        sphere = {
            target: node.representation_of ?? node['@id'],
            radius: defaultSphereRadius,
            x: sceneWidth / 2,
            y: sceneHeight / 2,
            z: sceneDepth / 2,
        };
    }
    else {
        sphere = {
            ...sphere,
            radius: sphere.radius / 1000,
            x: sphere.x / 1000,
            y: sphere.y / 1000,
            z: sphere.z / 1000,
        };
    }
    return [
        // Probing Sphere
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingSphere',
            '@type': 'SpatialSceneNode',
            unpickable: false,
            geometry: 'sphere',
            transformMatrix: new Matrix4(Matrix4.IDENTITY).translate([sphere.x, sphere.y, sphere.z]).scale(sphere.radius),
            color: gold,
        },
        // Probing Sphere Positive X Axis (D)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXD',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x + sphere.radius + sphereLineLength / 2, sphere.y, sphere.z])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: red$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x + sphere.radius + sphereLineLength, sphere.y, sphere.z])
                .rotateZ(toRadians(-90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: red$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'D',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.y, sphere.z])
                .scale(sphereConeRadius),
            color: red$1,
        },
        // Probing Sphere Negative X Axis (A)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXA',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x - sphere.radius - sphereLineLength / 2, sphere.y, sphere.z])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: red$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXACone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x - sphere.radius - sphereLineLength, sphere.y, sphere.z])
                .rotateZ(toRadians(90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: red$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXALabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'A',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.y, sphere.z])
                .scale(sphereConeRadius),
            color: red$1,
        },
        // Probing Sphere Positive Y Axis (W)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYW',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength / 2, sphere.z])
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: green$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength, sphere.z])
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: green$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'W',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.z])
                .scale(sphereConeRadius),
            color: green$1,
        },
        // Probing Sphere Negative Y Axis (S)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYS',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength / 2, sphere.z])
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: green$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength, sphere.z])
                .rotateZ(toRadians(180))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: green$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'S',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.z])
                .scale(sphereConeRadius),
            color: green$1,
        },
        // Probing Sphere Positive Z Axis (Q)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength / 2])
                .rotateX(toRadians(90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: blue$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength])
                .rotateX(toRadians(90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: blue$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'Q',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength + sphereConeRadius * 3])
                .scale(sphereConeRadius),
            color: blue$1,
        },
        // Probing Sphere Negative Z Axis (E)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZE',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength / 2])
                .rotateX(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: blue$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZECone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength])
                .rotateX(toRadians(-90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: blue$1,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZELabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'E',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength - sphereConeRadius * 3.5])
                .scale(sphereConeRadius),
            color: blue$1,
        },
    ];
}

const gray = [204, 204, 204, 255];
const red = [213, 0, 0, 255];
const green = [29, 204, 101, 255];
const blue = [41, 121, 255, 255];
/**
 * Create a set of scene nodes for the body-ui to show the lines around a cube
 *
 * @param node the Spatial Entity that the scene is drawn around
 * @param placement the Spatial Placement where the cube is placed
 * @returns a set of scene nodes for the body-ui
 */
function getTissueBlockScene(node, placement) {
    const sceneWidth = node.x_dimension / 1000;
    const sceneHeight = node.y_dimension / 1000;
    const sceneDepth = node.z_dimension / 1000;
    const originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.1;
    const defaultSphereRadius = Math.max(sceneWidth, sceneHeight, sceneDepth);
    const sphereLineRadius = defaultSphereRadius * 0.05;
    const sphereLineLength = defaultSphereRadius * 2;
    const sphereConeRadius = sphereLineRadius * 4;
    const cube = {
        radius: defaultSphereRadius / 1000 / 2,
        x: placement.x_translation / 1000,
        y: placement.y_translation / 1000,
        z: placement.z_translation / 1000,
        rx: toRadians(placement.x_rotation),
        ry: toRadians(placement.y_rotation),
        rz: toRadians(placement.z_rotation),
        sx: node.x_dimension / 1000,
        sy: node.y_dimension / 1000,
        sz: node.z_dimension / 1000,
    };
    return [
        // Carbon Rod Sphere
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginSphere',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'sphere',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z])
                .rotateXYZ([cube.rx, cube.ry, cube.rz])
                .multiplyRight(new Matrix4(Matrix4.IDENTITY).translate([-cube.sx / 2, -cube.sy / 2, -cube.sz / 2]).scale(originRadius)),
            color: gray,
        },
        // Carbon Rod X Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginX',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z])
                .rotateXYZ([cube.rx, cube.ry, cube.rz])
                .multiplyRight(new Matrix4(Matrix4.IDENTITY)
                .translate([0, -cube.sy / 2, -cube.sz / 2])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, cube.sx, sphereLineRadius])),
            color: red,
        },
        // Carbon Rod Y Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginY',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z])
                .rotateXYZ([cube.rx, cube.ry, cube.rz])
                .multiplyRight(new Matrix4(Matrix4.IDENTITY)
                .translate([-cube.sx / 2, 0, -cube.sz / 2])
                .scale([sphereLineRadius, cube.sy, sphereLineRadius])),
            color: green,
        },
        // Carbon Rod Z Axis
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeOriginZ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z])
                .rotateXYZ([cube.rx, cube.ry, cube.rz])
                .multiplyRight(new Matrix4(Matrix4.IDENTITY)
                .translate([-cube.sx / 2, -cube.sy / 2, 0])
                .rotateX(toRadians(90))
                .scale([sphereLineRadius, cube.sz, sphereLineRadius])),
            color: blue,
        },
        // Cube Positive X Axis (D)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXD',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x + cube.radius + sphereLineLength / 2, cube.y, cube.z])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: red,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXDCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x + cube.radius + sphereLineLength, cube.y, cube.z])
                .rotateZ(toRadians(-90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: red,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXDLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'D',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x + cube.radius + sphereLineLength + sphereConeRadius * 3, cube.y, cube.z])
                .scale(sphereConeRadius),
            color: red,
        },
        // Cube Negative X Axis (A)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXA',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x - cube.radius - sphereLineLength / 2, cube.y, cube.z])
                .rotateZ(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: red,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXACone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x - cube.radius - sphereLineLength, cube.y, cube.z])
                .rotateZ(toRadians(90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: red,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeXALabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'A',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x - cube.radius - sphereLineLength - sphereConeRadius * 3.5, cube.y, cube.z])
                .scale(sphereConeRadius),
            color: red,
        },
        // Cube Positive Y Axis (W)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYW',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y + cube.radius + sphereLineLength / 2, cube.z])
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: green,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYWCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y + cube.radius + sphereLineLength, cube.z])
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: green,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYWLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'W',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y + cube.radius + sphereLineLength + sphereConeRadius * 3, cube.z])
                .scale(sphereConeRadius),
            color: green,
        },
        // Cube Negative Y Axis (S)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYS',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y - cube.radius - sphereLineLength / 2, cube.z])
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: green,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYSCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y - cube.radius - sphereLineLength, cube.z])
                .rotateZ(toRadians(180))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: green,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeYSLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'S',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y - cube.radius - sphereLineLength - sphereConeRadius * 3.5, cube.z])
                .scale(sphereConeRadius),
            color: green,
        },
        // Cube Positive Z Axis (Q)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZQ',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z + cube.radius + sphereLineLength / 2])
                .rotateX(toRadians(90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: blue,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZQCone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z + cube.radius + sphereLineLength])
                .rotateX(toRadians(90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: blue,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZQLabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'Q',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z + cube.radius + sphereLineLength + sphereConeRadius * 3])
                .scale(sphereConeRadius),
            color: blue,
        },
        // Cube Negative Z Axis (E)
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZE',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cylinder',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z - cube.radius - sphereLineLength / 2])
                .rotateX(toRadians(-90))
                .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
            color: blue,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZECone',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'cone',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z - cube.radius - sphereLineLength])
                .rotateX(toRadians(-90))
                .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
            color: blue,
        },
        {
            '@id': 'http://purl.org/ccf/latest/ccf.owl#CubeZELabel',
            '@type': 'SpatialSceneNode',
            unpickable: true,
            geometry: 'text',
            text: 'E',
            transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([cube.x, cube.y, cube.z - cube.radius - sphereLineLength - sphereConeRadius * 3.5])
                .scale(sphereConeRadius),
            color: blue,
        },
    ];
}

/**
 * Generated bundle index. Do not edit.
 */

export { getOriginScene, getProbingSphereScene, getTissueBlockScene };
//# sourceMappingURL=ccf-scene-utils.mjs.map
