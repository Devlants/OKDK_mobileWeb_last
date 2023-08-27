import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import TopNavigation from "../../components/TopNavigation";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export default function Camera() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigation = useNavigate();

  const handlePaymentMove = () => {
    navigation("/Payment");
  };
  useEffect(() => {
    // 웹뷰 페이지가 로드되면 메시지 전송
    const message = { type: 'sendToApp', data: { message: "hellow" } };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    
  
  }, []);

//   window.addEventListener('message', (event) => {
//     const data = event.nativedata;
//     console.log(data); // 확인용으로 전체 data 출력

// try {
//     const parsedData = JSON.parse(data);
//     console.log('Parsed data:', parsedData);

//     if (parsedData && parsedData.card) { // data.card가 존재하는지만 확인
//         console.log('Received data in WebView:', parsedData.card);
//         navigation('/payment', { state: { enroll: true , datas: {data: parsedData}} });
//     }
// } catch (error) {
//     console.error('Error parsing JSON:', error);
// }

//   });

document.addEventListener('message',(e) => {
  console.log(e.data);
  const parsedData = JSON.parse(e.data);
console.log(parsedData.card);
  // const data1 = JSON.parse(e.data.card);
  // alert(e.data);
  navigation('/DirectInput', { state: { enroll: true , datas: parsedData.card} }); 
});


  return (
    <div>
      <TopNavigation />
      <Modal
        title="카메라 촬영"
        basicButtonName="확인"
        basicButtonOnClick={handlePaymentMove}
      >
        <div>안녕</div>
      </Modal>
    </div>
  );
}
