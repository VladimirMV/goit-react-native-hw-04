// import * as React from 'react';
// import Svg, { Path } from 'react-native-svg';
// const SvgUser = props => (
//   <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
//     <Path
//       stroke="#212121"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeOpacity={0.8}
//       d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
//     />
//     <Path
//       stroke="#212121"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeOpacity={0.8}
//       d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
//       clipRule="evenodd"
//     />
//   </Svg>
// );
// export default SvgUser;
import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgUser(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M28 29v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2"
        stroke="#212121"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M20 19a4 4 0 100-8 4 4 0 000 8z"
        stroke="#212121"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgUser

