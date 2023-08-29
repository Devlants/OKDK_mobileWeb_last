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
    const message = { type: 'WebViewCamera', data: { message: "hellow" } };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    
  
  }, []);


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
