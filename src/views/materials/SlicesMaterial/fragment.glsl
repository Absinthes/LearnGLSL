// 通过调整uv.x的值来实现，通过噪声和阶梯函数来实现不规则的切片

uniform sampler2D uTexture;
uniform float slices;
uniform float offset;
uniform float time;
uniform float speedV;
// uniform float speedH;
varying vec2 vUv;

float steppedVal(float v,float steps){
  return floor(v*steps)/steps;
}

//RANDOM
//1D
//returns 0 - 1
float random1d(float n){
  return fract(sin(n)*43758.5453);
}

//returns 0 - 1
float noise1d(float p){
  float fl=floor(p);
  float fc=fract(p);
  return mix(random1d(fl),random1d(fl+1.),fc);
}

const float TWO_PI=6.283185307179586;

void main(){
  vec2 uv=vUv;
  //生成一个噪声，让其跟uv.y轴相关联，这样就可以让其在同一水平线上产生同样的偏移值。
  float n=noise1d(uv.y*slices+time*speedV*3.);
  
  // 从给定的参数n中获取整数部分，并将其传递给steppedVal函数，该函数将根据该整数部分和给定的参数slices返回一个阶梯函数的值
  float ns=steppedVal(fract(n),slices);
  
  // 使用ns作为参数调用random1d函数，生成一个随机数
  float nsr=random1d(ns);
  
  vec2 uvn=uv;
  // x轴偏移通过sin函数来实现，使得其有规律，当像素在同一个y轴上他们的偏移值是一样的
  uvn.x+=nsr*sin(time*TWO_PI+nsr*20.)*offset;
  
  gl_FragColor=texture2D(uTexture,uvn);
}
