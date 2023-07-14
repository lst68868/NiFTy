
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { nanoid } from 'nanoid';
import nftImage from '../images/nft.png';


const DropAnimation = () => {
  const waveRef = useRef([]);
  const circleRef = useRef([]);
  const [paths, setPaths] = useState([]);
  const numPaths = 35;
  const numPoints = 5;
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
      const pathLength =  [100, 150, 200][Math.floor(Math.random() * 3)];
      const stroke = [2, 3, 5][Math.floor(Math.random() * 3)];
      const circleRadius = index >= 30 ? 10 : stroke; // Larger circle radius for last 5 paths
      const phaseOffset = Math.random() * 2 * Math.PI;

      for (let i = 0; i < numPoints; i++) {
        let ratio = gsap.parseEase('power1.inOut')(i / (numPoints - 1));
        points.push({
        //   x: pathLength - ((i * pathLength) / (numPoints - 1)),
          x: (i * pathLength) / (numPoints - 1),
          y: 0,
        //   startX: pathLength - ((i * pathLength) / (numPoints - 1)),
          startX: (i * pathLength) / (numPoints - 1),
          startY: 0,
          ratio: ratio,
        });
      }

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
          // Reduced wave speed
          count -= wave.speed;
          for (let i = 0; i < numPoints; i++) {
            let p = points[i];
            // Added phase offset to the wave equation
            p.x = p.startX + Math.cos((i * wave.xPhase) + count + phaseOffset) * wave.xOffset * p.ratio;
            p.y = p.startY + Math.sin((i * wave.yPhase) + count + phaseOffset) * wave.yOffset * p.ratio;
          
          }
          waveRef?.current[index]?.setAttribute('d', cardinalSpline(points, false, 1));
          circleRef?.current[index]?.setAttribute('cx', points[numPoints - 1].x); // Attach circle to the last point
          circleRef?.current[index]?.setAttribute('cy', points[numPoints - 1].y);
        },
      })
      .to(wave, {
        duration: 20,// This duration affects how long it takes for wave properties to change
        speed: 0.001,
        xOffset: 2,
        yOffset: 10,
        ease: "sine.inOut"
      }, 0);// Set the start time of this animation to 0, to start immediately

      return { 
        animation: tl, 
        //Adjusted rotation to make elements perpendicular
        // rotation: ((index / numPaths) * 360) + 90,
        rotation: index >= 20 && index < 23
        ? ((index / numPaths) * 360) + 90 - ((23 - index) * 20)
        : index >= 23
        ? ((index / numPaths) * 360) + 90 + ((index - 22) * 20)
        : ((index / numPaths) * 360) + 90,
        pathLength: pathLength,
        stroke: stroke,
        circleRadius: circleRadius,
        imagePath: index >= 30 ? nftImage : null, // Add image paths for last 5 paths
      };
    });

    setPaths(newPaths);
  }, []);

  return (
    // <div className="flex justify-center items-center w-[200px] bg-pink-400">
      <svg viewBox="-225 -225 450 450">
        {paths.map((path, index) => (
          <g key={nanoid()} transform={`rotate(${path.rotation}, 0, 0)`}>
            <path
              ref={el => waveRef.current[index] = el}
              d="M0,100"
              style={{
                fill: 'none',
                stroke: '#000000',
                strokeWidth: `${path.stroke}px`,
              }}
            />
            <circle
              ref={el => circleRef.current[index] = el}
              r={path.circleRadius}
              fill="#000000"
              onMouseEnter={() => { /* Pause GSAP animation and enlarge circle here */ }}
            onMouseLeave={() => { /* Restart GSAP animation and reduce circle size here */ }}          
            />

            {path.imagePath && (
                <>
                    <clipPath id={`clip${index}`}>
                        <circle r={path.circleRadius} fill="#000000" />
                    </clipPath>
                    <image
                        href={path.imagePath}
                        clipPath={`url(#clip${index})`}
                        x={-path.circleRadius}
                        y={-path.circleRadius}
                        width={path.circleRadius * 2}
                        height={path.circleRadius * 2}
                    />
                </>
            )}
          </g>
        ))}
      </svg>
    // </div>
  );
};

export default DropAnimation;


