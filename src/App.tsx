import styled from 'styled-components';
import { motion, scale, Variants } from 'framer-motion';
import { useRef } from 'react';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  //overflow: hidden;
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
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          // dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
          dragConstraints={biggerBoxRef} // ref 가능
          dragSnapToOrigin
          dragElastic={0.5} // 탄성으로 돌아감 안쪽에 머물게 하려면 0 주면 됨
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
    </Wrapper>
  );
};

export default App;
