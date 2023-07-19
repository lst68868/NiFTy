import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { nanoid } from 'nanoid';


const CreateNFTAnimation = () => {
  const waveRef = useRef([]);
  const circleRef = useRef([]);
  const startCircleRef = useRef([]);
  const [paths, setPaths] = useState([]);
  const numPaths = 40;
  const numPoints = 20;
  const wave = {
    xPhase: Math.PI / 2,
    yPhase: Math.PI / 6,
    xOffset: 0,
    yOffset: 5,
    speed: 0.00,
  };  
  
  const cardinalSpline = (data, closed, tension) => {
    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 0.5;
    let size = data.length - (closed ? 0 : 1);
    let path = "M" + data[0].x + " " + data[0].y + " C";
    for (let i = 0; i < size; i++) {
      let p0, p1, p2, p3;
      if (closed) {
        p0 = data[(i - 1 + size) % size];
        p1 = data[i];
        p2 = data[(i + 1) % size];
        p3 = data[(i + 2) % size];
      } else {
        p0 = i === 0 ? data[0] : data[i - 1];
        p1 = data[i];
        p2 = data[i + 1];
        p3 = i === size - 1 ? p2 : data[i + 2];
      }
      const x1 = p1.x + (p2.x - p0.x) / 6 * tension;
      const y1 = p1.y + (p2.y - p0.y) / 6 * tension;
      const x2 = p2.x - (p3.x - p1.x) / 6 * tension;
      const y2 = p2.y - (p3.y - p1.y) / 6 * tension;
      path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }
    return closed ? path + "z" : path;
  };

  useEffect(() => {
    let count = 0;
    const newPaths = Array.from({ length: numPaths }, (_, index) => {
      let points = [];
      const pathLength =  [120, 160, 200][Math.floor(Math.random() * 3)];
      const stroke = [2, 3, 5][Math.floor(Math.random() * 3)];
      const circleRadius = stroke * 2; 
      const phaseOffset = Math.random() * 2 * Math.PI;


      for (let i = 0; i < numPoints; i++) {
        let ratio = gsap.parseEase('power1.inOut')(i / (numPoints - 1));
        points.push({
          x: (i * pathLength) / (numPoints - 1),
          y: 0,
          startX: (i * pathLength) / (numPoints - 1),
          startY: 0,
          ratio: ratio,
        });
      }

      let initX = points[numPoints - 1].x - circleRadius;
      let initY = points[numPoints - 1].y - circleRadius;
      let initStartX = points[4].x - circleRadius;
      let initStartY = points[4].y - circleRadius;

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          count -= wave.speed;
          for (let i = 0; i < numPoints; i++) {
            let p = points[i];
            p.x = p.startX + Math.cos((i * wave.xPhase) + count + phaseOffset) * wave.xOffset * p.ratio;
            p.y = p.startY + Math.sin((i * wave.yPhase) + count + phaseOffset) * wave.yOffset * p.ratio;
          }
          let lastPointX = points[numPoints - 1].x;
          let lastPointY = points[numPoints - 1].y;
          
          waveRef?.current[index]?.setAttribute('d', cardinalSpline(points, false, 1));
          circleRef?.current[index]?.setAttribute('cx', lastPointX);
          circleRef?.current[index]?.setAttribute('cy', lastPointY);
          startCircleRef?.current[index]?.setAttribute('cx', initStartX);
          startCircleRef?.current[index]?.setAttribute('cy', initStartY);

        }
      }).to(wave, {
        duration: 20,
        speed: 0.001,
        xOffset: 2,
        yOffset: 10,
        ease: "sine.inOut"
      }, 0);

      return {
        animation: tl,
        rotation: ((index / numPaths) * 360) + 90,
        pathLength: pathLength,
        stroke: stroke,
        circleRadius: circleRadius,
        initX: initX,
        initY: initY,
        initStartX: initStartX,
        initStartY: initStartY,
      };
    });

    setPaths(newPaths);
  }, []);

  return (
    <svg className="lg:w-full lg:h-full w-600 h-600 p-12 mb-[56px] md:mb-[40px]" viewBox="-225 -225 450 450">
      <defs>
      <linearGradient id="grad1" gradientTransform="rotate(90)">
        <stop offset="0%" style={{stopColor: "#00FFFF"}} />
        <stop offset="100%" style={{stopColor: "#39FF14"}} />
      </linearGradient>
      </defs>
      {paths.map((path, index) => (
        <g key={nanoid()} transform={`rotate(${path.rotation}, 0, 0)`}>
          <path ref={el => waveRef.current[index] = el} stroke="url(#grad1)" strokeWidth={path.stroke} fill="transparent" />
          <circle
            ref={el => circleRef.current[index] = el}
            r={path.circleRadius}
            fill='url(#grad1)'
            cx={path.initX}
            cy={path.initY}
          />
          <circle
            ref={el => startCircleRef.current[index] = el}
            r={path.circleRadius}
            fill='url(#grad1)'
            cx={path.initStartX}
            cy={path.initStartY}
          />
        </g>
      ))}
    </svg>
  );
};


export default CreateNFTAnimation;