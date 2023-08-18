import * as React from 'react';
import Svg, { G, Circle, Path, Defs, ClipPath } from 'react-native-svg';

const DeleteIcon = (props) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Circle
        cx={12.678}
        cy={12.678}
        r={12}
        transform="rotate(-45 12.678 12.678)"
        fill="#fff"
        stroke="#E8E8E8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m8.435 7.728-.707.707 4.243 4.243-4.243 4.242.707.707 4.243-4.242 4.242 4.242.707-.707-4.242-4.242 4.243-4.243-.708-.707-4.242 4.242-4.243-4.242Z"
        fill="#BDBDBD"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h25v25H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default DeleteIcon;
