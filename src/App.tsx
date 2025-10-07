import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useViewportScroll,
  Variants,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  //background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { borderRadius: '100px', scale: 1 },
};

const App = () => {
  const x = useMotionValue(0);
  //const scale = useTransform(x, [-800, 0, 800], [2, 1, 0]);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))',
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
    ],
  );

  // const { scrollY, scrollYProgress } = useViewportScroll();
  // ✅ useScroll()이 useViewportScroll()을 완전히 대체
  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  // useEffect(() => {
  //   x.onChange(() => console.log(x.get()));
  // }, [x]);

  // Framer Motion v10 이상부터는 이 훅이 공식적으로 onChange의 대체임
  // ✅ motionValue가 바뀔 때마다 실행됨
  useMotionValueEvent(x, 'change', (latest) => {
    console.log('x changed to:', latest);
  });
  // useMotionValueEvent(scale, 'change', (latest) => {
  //   console.log('scale changed to:', latest);
  // });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    console.log('scrollY : ', latest, ' scrollYProgress : ', scrollYProgress.get());
  });

  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
};

export default App;
