import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { nanoid } from 'nanoid';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';
import image4 from '../images/image4.png';
import image5 from '../images/image5.png';
import blobcenter from '../images/blobcenter.png'

const images = [image1, image2, image3, image4, image5];

const DropAnimation = () => {
  const waveRef = useRef([]);
  const circleRef = useRef([]);
  const imageRef = useRef([]);
  const clipPathRef = useRef([]);
  const borderCircleRef = useRef([]);
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


  const getUniqueRandomIndices = (count, total, minDistance) => {
    let indices = new Set();
    while (indices.size < count) {
      let index = Math.floor(Math.random() * total);
      if (
        Array.from(indices).every(
          existingIndex => Math.abs(existingIndex - index) >= minDistance
        )
      ) {
        indices.add(index);
      }
    }
    return Array.from(indices);
  };

  const imageIndices = getUniqueRandomIndices(images.length, numPaths, 5);


  let thickestStrokes = Array(images.length).fill(0); // Keep track of the thickest strokes

  const handleMouseEnter = (index) => {
    paths[index].animation.pause();
    gsap.to(circleRef.current[index], {attr: {r: paths[index].circleRadius * 1.5}, duration: 0.3});
    if (paths[index].imagePath) {
      gsap.to(imageRef.current[index], {attr: {width: paths[index].circleRadius * 3, height: paths[index].circleRadius * 3}, duration: 0.3});
    }
  };

  const handleMouseLeave = (index) => {
    paths[index].animation.play();
    gsap.to(circleRef.current[index], {attr: {r: paths[index].circleRadius}, duration: 0.3});
    if (paths[index].imagePath) {
      gsap.to(imageRef.current[index], {attr: {width: paths[index].circleRadius * 2, height: paths[index].circleRadius * 2}, duration: 0.3});
    }
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
      const stroke = [2, 4, 6][Math.floor(Math.random() * 3)];
      const circleRadius = imageIndices.includes(index) ? 30 : stroke * 2; // If the path has an image, use a larger radius
      const phaseOffset = Math.random() * 2 * Math.PI;

      const minStroke = Math.min(...thickestStrokes);
      const imagePath = imageIndices.includes(index) ? images[imageIndices.indexOf(index)] : null;


      if (imagePath) {
        thickestStrokes[thickestStrokes.indexOf(minStroke)] = stroke;
      }


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
          clipPathRef?.current[index]?.children[0].setAttribute('cx', lastPointX);
        clipPathRef?.current[index]?.children[0].setAttribute('cy', lastPointY);
        borderCircleRef?.current[index]?.setAttribute('cx', lastPointX);
      borderCircleRef?.current[index]?.setAttribute('cy', lastPointY);
        if (imagePath) {
            imageRef?.current[index]?.setAttribute('x', lastPointX - circleRadius);
            imageRef?.current[index]?.setAttribute('y', lastPointY - circleRadius);
          }

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
        imagePath: imagePath,
        initX: initX,
        initY: initY,
      };
    });

    setPaths(newPaths);
  }, []);

  return (
    <svg viewBox="-225 -225 450 450">
      {paths.map((path, index) => (
        <g key={nanoid()} transform={`rotate(${path.rotation}, 0, 0)`}>
          <path ref={el => waveRef.current[index] = el} stroke="#000000" strokeWidth={path.stroke} fill="transparent" />
          <circle
            ref={el => circleRef.current[index] = el}
            r={path.circleRadius}
            fill={path.imagePath ? 'transparent' : '#000000'}
            cx={path.initX}
            cy={path.initY}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          />
          {path.imagePath && (
            <g>
              <clipPath id={`clip${index}`} ref={el => clipPathRef.current[index] = el}>
                <circle r={path.circleRadius} cx={path.initX} cy={path.initY} />
              </clipPath>

              <image
                ref={el => imageRef.current[index] = el}
                href={path.imagePath}
                clipPath={`url(#clip${index})`}
                x={-path.circleRadius} // Center the image in the circle
                y={-path.circleRadius} // Center the image in the circle
                width={path.circleRadius * 2}
                height={path.circleRadius * 2}
                preserveAspectRatio="xMidYMid slice" // This ensures that the image is cropped to fill the circle
              />
              <circle
          ref={el => borderCircleRef.current[index] = el} // Attach ref to circle
          cx={path.initX}
          cy={path.initY}
          r={path.circleRadius}
          fill="transparent"
          stroke="black"
          strokeWidth="4"
        />
            </g>
            
          )}
        </g>
      ))}
      <image
        href={blobcenter}
        x={-25} // center of svg viewbox x-axis
        y={-25} // center of svg viewbox y-axis
        width={60} // width of svg viewbox
        height={60} // height of svg viewbox
        preserveAspectRatio="xMidYMid slice" // This ensures that the image is cropped to fill the circle
      />
    </svg>
  );
};

export default DropAnimation;