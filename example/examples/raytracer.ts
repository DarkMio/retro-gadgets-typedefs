import { WithCPU, WithLcd, WithVideoChip } from "../../typedefs/helpers";

class Vector {
    constructor(public x: number,
                public y: number,
                public z: number) {
    }
    static times(k: number, v: Vector) { return new Vector(k * v.x, k * v.y, k * v.z); }
    static minus(v1: Vector, v2: Vector) { return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); }
    static plus(v1: Vector, v2: Vector) { return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); }
    static dot(v1: Vector, v2: Vector) { return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }
    static mag(v: Vector) { return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); }
    static norm(v: Vector) {
        const mag = Vector.mag(v);
        const div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }
    static cross(v1: Vector, v2: Vector) {
        return new Vector(v1.y * v2.z - v1.z * v2.y,
                          v1.z * v2.x - v1.x * v2.z,
                          v1.x * v2.y - v1.y * v2.x);
    }
}

class ColorTS {
    constructor(public r: number,
                public g: number,
                public b: number) {
    }
    static scale(k: number, v: ColorTS) { return new ColorTS(k * v.r, k * v.g, k * v.b); }
    static plus(v1: ColorTS, v2: ColorTS) { return new ColorTS(v1.r + v2.r, v1.g + v2.g, v1.b + v2.b); }
    static times(v1: ColorTS, v2: ColorTS) { return new ColorTS(v1.r * v2.r, v1.g * v2.g, v1.b * v2.b); }
    static white = new ColorTS(1.0, 1.0, 1.0);
    static grey = new ColorTS(0.5, 0.5, 0.5);
    static black = new ColorTS(0.0, 0.0, 0.0);
    static background = ColorTS.black;
    static defaultColor = ColorTS.black;
    static toDrawingColor(c: ColorTS) {
        const legalize = (d: number) => d > 1 ? 1 : d;
        return {
            r: Math.floor(legalize(c.r) * 255),
            g: Math.floor(legalize(c.g) * 255),
            b: Math.floor(legalize(c.b) * 255)
        }
    }
}

class Camera {
    public forward: Vector;
    public right: Vector;
    public up: Vector;

    constructor(public pos: Vector, lookAt: Vector) {
        const down = new Vector(0.0, -1.0, 0.0);
        this.forward = Vector.norm(Vector.minus(lookAt, this.pos));
        this.right = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, down)));
        this.up = Vector.times(1.5, Vector.norm(Vector.cross(this.forward, this.right)));
    }
}

interface Ray {
    start: Vector;
    dir: Vector;
}

interface Intersection {
    thing: Thing;
    ray: Ray;
    dist: number;
}

interface Surface {
    diffuse: (pos: Vector) => ColorTS;
    specular: (pos: Vector) => ColorTS;
    reflect: (pos: Vector) => number;
    roughness: number;
}

interface Thing {
    intersect: (ray: Ray) => Intersection | null;
    normal: (pos: Vector) => Vector;
    surface: Surface;
}

interface Light {
    pos: Vector;
    color: ColorTS;
}

interface Scene {
    things: Thing[];
    lights: Light[];
    camera: Camera;
}

class Sphere implements Thing {
    public radius2: number;

    constructor(public center: Vector, radius: number, public surface: Surface) {
        this.radius2 = radius * radius;
    }
    normal(pos: Vector): Vector { return Vector.norm(Vector.minus(pos, this.center)); }
    intersect(ray: Ray) {
        const eo = Vector.minus(this.center, ray.start);
        const v = Vector.dot(eo, ray.dir);
        let dist = 0;
        if (v >= 0) {
            const disc = this.radius2 - (Vector.dot(eo, eo) - v * v);
            if (disc >= 0) {
                dist = v - Math.sqrt(disc);
            }
        }
        if (dist === 0) {
            return null;
        } else {
            return { thing: this, ray: ray, dist: dist };
        }
    }
}

class Plane implements Thing {
    public normal: (pos: Vector) =>Vector;
    public intersect: (ray: Ray) => Intersection | null;
    constructor(norm: Vector, offset: number, public surface: Surface) {
        this.normal = function(pos: Vector) { return norm; }
        this.intersect = function(ray: Ray): Intersection | null {
            const denom = Vector.dot(norm, ray.dir);
            if (denom > 0) {
                return null;
            } else {
                const dist = (Vector.dot(norm, ray.start) + offset) / (-denom);
                return { thing: this, ray: ray, dist: dist };
            }
        }
    }
}

module Surfaces {
    export const shiny: Surface = {
        diffuse: function(pos) { return ColorTS.white; },
        specular: function(pos) { return ColorTS.grey; },
        reflect: function(pos) { return 0.7; },
        roughness: 250
    }
    export const checkerboard: Surface = {
        diffuse: function(pos) {
            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                return ColorTS.white;
            } else {
                return ColorTS.black;
            }
        },
        specular: function(pos) { return ColorTS.white; },
        reflect: function(pos) {
            if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
                return 0.1;
            } else {
                return 0.7;
            }
        },
        roughness: 150
    }
}


class RayTracer {
    private maxDepth = 5;

    private intersections(ray: Ray, scene: Scene): Intersection | undefined {
        let closest = +Infinity;
        let closestInter: Intersection | undefined = undefined;
        scene.things.forEach((thing, i) => {
            const inter = thing.intersect(ray);
            if (inter != null && inter.dist < closest) {
                closestInter = inter;
                closest = inter.dist;
            }
        })
        return closestInter;
    }

    private testRay(ray: Ray, scene: Scene) {
        const isect = this.intersections(ray, scene);
        if (isect != null) {
            return isect.dist;
        } else {
            return undefined;
        }
    }

    private traceRay(ray: Ray, scene: Scene, depth: number): ColorTS {
        const isect = this.intersections(ray, scene);
        if (isect === undefined) {
            return ColorTS.background;
        } else {
            return this.shade(isect, scene, depth);
        }
    }

    private shade(isect: Intersection, scene: Scene, depth: number) {
        const d = isect.ray.dir;
        const pos = Vector.plus(Vector.times(isect.dist, d), isect.ray.start);
        const normal = isect.thing.normal(pos);
        const reflectDir = Vector.minus(d, Vector.times(2, Vector.times(Vector.dot(normal, d), normal)));
        const naturalColor = ColorTS.plus(ColorTS.background,
                                      this.getNaturalColor(isect.thing, pos, normal, reflectDir, scene));
        const reflectedColor = (depth >= this.maxDepth) ? ColorTS.grey : this.getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth);
        return ColorTS.plus(naturalColor, reflectedColor);
    }

    private getReflectionColor(thing: Thing, pos: Vector, normal: Vector, rd: Vector, scene: Scene, depth: number) {
        return ColorTS.scale(thing.surface.reflect(pos), this.traceRay({ start: pos, dir: rd }, scene, depth + 1));
    }

    private getNaturalColor(thing: Thing, pos: Vector, norm: Vector, rd: Vector, scene: Scene) {
        const addLight = (col: ColorTS, light: Light) => {
            const ldis = Vector.minus(light.pos, pos);
            const livec = Vector.norm(ldis);
            const neatIsect = this.testRay({ start: pos, dir: livec }, scene);
            const isInShadow = (neatIsect === undefined) ? false : (neatIsect <= Vector.mag(ldis));
            if (isInShadow) {
                return col;
            } else {
                const illum = Vector.dot(livec, norm);
                const lcolor = (illum > 0) ? ColorTS.scale(illum, light.color)
                                          : ColorTS.defaultColor;
                const specular = Vector.dot(livec, Vector.norm(rd));
                const scolor = (specular > 0) ? ColorTS.scale(Math.pow(specular, thing.surface.roughness), light.color)
                                          : ColorTS.defaultColor;
                return ColorTS.plus(col, ColorTS.plus(ColorTS.times(thing.surface.diffuse(pos), lcolor),
                                                  ColorTS.times(thing.surface.specular(pos), scolor)));
            }
        }
        return scene.lights.reduce(addLight, ColorTS.defaultColor);
    }

    render(scene: Scene, ctx: VideoChip, screenWidth: number, screenHeight: number) {
        const getPoint = (x: number, y: number, camera: Camera) => {
            const recenterX = (x: number) =>(x - (screenWidth / 2.0)) / 2.0 / screenWidth;
            const recenterY = (y: number) => - (y - (screenHeight / 2.0)) / 2.0 / screenHeight;
            const aspect = screenWidth / screenHeight;
            return Vector.norm(Vector.plus(camera.forward, Vector.plus(Vector.times(recenterX(x * aspect), camera.right), Vector.times(recenterY(y), camera.up))));
        }
        for (let y = 0; y < screenHeight; y++) {
            for (let x = 0; x < screenWidth; x++) {
                const color = this.traceRay({ start: scene.camera.pos, dir: getPoint(x, y, scene.camera) }, scene, 0);
                const c = ColorTS.toDrawingColor(color);
                ctx.FillRect(vec2(x, y), vec2(x+1, y+1), Color(c.r, c.g, c.b));
            }
        }
    }
}


function defaultScene(): Scene {
    return {
        things: [new Plane(new Vector(0.0, 1.0, 0.0), 0.0, Surfaces.checkerboard),
                 new Sphere(new Vector(0.0, 1.0, -0.25), 1.0, Surfaces.shiny),
                 new Sphere(new Vector(-6, 3.0, -5.0), 1.0, Surfaces.shiny),
                 new Sphere(new Vector(-6, 8.0, 15.0), 5.0, Surfaces.shiny),
                 new Sphere(new Vector(-1.0, 0.5, 1.5), 0.5, Surfaces.shiny)],
        
        lights: [{ pos: new Vector(-2.0, 2.5, 0.0), color: new ColorTS(0.49, 0.07, 0.07) },
                 { pos: new Vector(1.5, 2.5, 1.5), color: new ColorTS(0.07, 0.07, 0.49) },
                 { pos: new Vector(1.5, 2.5, -1.5), color: new ColorTS(0.07, 0.49, 0.071) },
                 { pos: new Vector(0.0, 3.5, 0.0), color: new ColorTS(0.21, 0.21, 0.35) }],
        camera: new Camera(new Vector(3.0, 2.0, 4.0), new Vector(-1.0, 0.5, 0.0))
    };
}

type Module = Gadget & WithVideoChip & WithLcd & WithCPU;
declare const gdt: Module;

function exec() {
    const rayTracer = new RayTracer();
    return rayTracer.render(defaultScene(), gdt.VideoChip0, gdt.VideoChip0.Width, gdt.VideoChip0.Height);

}

const start = gdt.CPU0.Time;
exec();
const end = gdt.CPU0.Time;
update = () => {
    
    // lcds have 16 x 2 characters
    gdt.Lcd0.Text = "abcdefghijklmnop qrstuvwxyz1234567890"

    const upperRow = "  WONDERTRACER  "
    const time = end - start;
    const stringTime = `${time}s`;
    const halfStringLen = stringTime.length / 2;
    const halfSize = 16 / 2;
    const fillCount = math.floor(halfSize - halfStringLen);
    gdt.Lcd0.Text = `${upperRow}${stringTime.padStart(fillCount + stringTime.length)}`
}