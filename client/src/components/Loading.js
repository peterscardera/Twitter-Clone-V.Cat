import React from 'react';
import ReactLoading from 'react-loading';
import { COLORS } from "../constants";

 
const Loading = ({ type, color }) => (
    <ReactLoading type={"bars"} color={`${COLORS.primary}`} height={'15%'} width={'15%'} />
);
 
export default Loading;