import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

function App() {
  const mapElement = useRef(null);

  const [draggable, setDraggable] = useState(false);
  const [zoomControl, setZoomControl] = useState(false);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      draggable: draggable,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [draggable, zoomControl]);

  return (
    <MapContainer>
      <Title>ts-ncp-map</Title>
      <ButtonWrapper>
        <Button onClick={() => setDraggable(!draggable)} isActive={draggable}>
          Draggable
        </Button>
        <Button
          onClick={() => setZoomControl(!zoomControl)}
          isActive={zoomControl}
        >
          ZoomControl
        </Button>
      </ButtonWrapper>
      <Map ref={mapElement} />
    </MapContainer>
  );
}

const MapContainer = styled.div`
  padding: 50px;
`;

const Map = styled.div`
  width: 100%;
  height: 800px;
`;

const Title = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const Button = styled.div<{ isActive?: boolean }>`
  padding: 10px;
  border-radius: 4px;
  background: ${(props) => (props.isActive ? "#1E88E5" : "#F4F7FF")};
  color: ${(props) => (props.isActive ? "#F4F7FF" : "#1E88E5")};
  cursor: pointer;
`;

export default App;
