'use client';

import { useEffect, useRef } from 'react';

interface ShaderBackgroundProps {
  className?: string;
}

const vertexShaderSource = `#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

// Original shader by Matthias Hurrle (@atzedent)
const fragmentShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 move;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define N normalize
#define S smoothstep
#define MN min(R.x,R.y)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
#define csqr(a) vec2(a.x*a.x-a.y*a.y,2.*a.x*a.y)
float rnd(vec3 p) {
    p=fract(p*vec3(12.9898,78.233,156.34));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y*p.z);
}
float swirls(in vec3 p) {
    float d=.0;
    vec3 c=p;
    for(float i=min(.0,time); i<5.; i++) {
        p=.45*abs(p)/dot(p,p)-.45;
        p.yz=csqr(p.yz);
        p=p.zxy;
        d+=exp(-19.*abs(dot(p,c)));
    }
    return d;
}
vec3 march(in vec3 p, vec3 rd) {
    float d=.2, t=.0, c=.0, k=mix(.9,1.,rnd(rd)),
    maxd=length(p)-1.;
    vec3 col=vec3(0);
    for(float i=min(.0,time); i<120.; i++) {
        t+=d*exp(-2.*c)*k;
        c=swirls(p+rd*t);
        if (t<5e-2 || t>maxd) break;
        col+=vec3(c,c*c,c*c)*8e-3;
    }
    return col;
}
float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}
vec3 sky(vec2 p, bool anim) {
    p.x-=.17-(anim?2e-4*T:.0);
    p*=500.;
    vec2 id=floor(p), gv=fract(p)-.5;
    float n=rnd(id), d=length(gv);
    if (n<.975) return vec3(0);
    return vec3(S(3e-2*n,1e-3*n,d*d));
}
void cam(inout vec3 p) {
    p.yz*=rot(move.y*3./MN-T*.05);
    p.xz*=rot(-move.x*3./MN+T*.025);
}
void main() {
    vec2 uv=(FC-.5*R)/MN;
    vec3 col=vec3(0),
    p=vec3(0,0,-16),
    rd=N(vec3(uv,1)), rdd=rd;
    cam(p); cam(rd);
    col=march(p,rd);
    col=S(-.2,.9,col);
    vec2 sn=.5+vec2(atan(rdd.x,rdd.z),atan(length(rdd.xz),rdd.y))/6.28318;
    col=max(col,vec3(sky(sn,true)+sky(2.+sn*2.,true)));
    float t=min((time-.5)*.3,1.);
    uv=FC/R*2.-1.;
    uv*=.7;
    float v=pow(dot(uv,uv),1.8);
    col=mix(col,vec3(0),v);
    col=mix(vec3(0),col,t);
    col=max(col,.08);
  O=vec4(col,1);
}
`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function ShaderBackground({ className = '' }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });

    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const timeUniformLocation = gl.getUniformLocation(program, 'time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
    const moveUniformLocation = gl.getUniformLocation(program, 'move');

    // Create buffer for fullscreen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Create VAO
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Resize function - use 0.5 resolution for performance
    const resize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      // 0.5 resolution for better performance on heavy shader
      const pixelRatio = Math.max(1, window.devicePixelRatio) * 0.5;

      canvas.width = displayWidth * pixelRatio;
      canvas.height = displayHeight * pixelRatio;

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse move handler - track on entire window
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation with frame throttling (target ~30fps for performance)
    startTimeRef.current = performance.now() / 1000;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const render = (timestamp: number) => {
      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed >= frameInterval) {
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);
        const currentTime = performance.now() / 1000 - startTimeRef.current;

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        // Set uniforms
        gl.uniform1f(timeUniformLocation, currentTime);
        gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
        gl.uniform2f(moveUniformLocation, mouseRef.current.x, mouseRef.current.y);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render(0);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);

      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'auto' }}
    />
  );
}
