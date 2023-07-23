// import * as React from 'react';
// import Svg, { Path } from 'react-native-svg';
// const SvgGrid = props => (
//   <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
//     <Path fill="#fff" d="M0 0h24v24H0z" />
//     <Path
//       stroke="#212121"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeOpacity={0.8}
//       d="M3 3h7v7H3V3Zm11 0h7v7h-7V3Zm0 11h7v7h-7v-7ZM3 14h7v7H3v-7Z"
//       clipRule="evenodd"
//     />
//   </Svg>
// );
//export default SvgGrid;
import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgGrid(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path transform="translate(8 8)" fill="#fff" d="M0 0H24V24H0z" />
      <Path
        clipRule="evenodd"
        d="M11 11h7v7h-7v-7zM22 11h7v7h-7v-7zM22 22h7v7h-7v-7zM11 22h7v7h-7v-7z"
        stroke="#212121"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgGrid