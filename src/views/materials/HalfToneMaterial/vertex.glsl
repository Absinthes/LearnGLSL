varying vec2 vUv;

void main(){
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  
  vec4 modelPosition=modelMatrix*vec4(position,1.);
  vec4 viewPosition=viewMatrix*modelPosition;
  vec4 projectedPosition=projectionMatrix*viewPosition;
  gl_Position=projectedPosition;
  
  vUv=uv;
}