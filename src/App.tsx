import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

function App() {
  const mapElement = useRef(null);

  const [isGray, setIsGray] = useState(false);

  const [draggable, setDraggable] = useState(false);
  const [zoomControl, setZoomControl] = useState(false);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(false);

  const mapTypeIdList = ["normal", "terrain", "satellite", "hybrid"];

  const [mapTypeId, setMapTypeId] = useState("normal");
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl,
      keyboardShortcuts: keyboardShortcuts,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      draggable: draggable,
      mapTypeId: mapTypeId,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });

    var polygon = new naver.maps.Polygon({
      map: map,
      paths: [
        [
          new naver.maps.LatLng(37.5656, 126.9769),
          new naver.maps.LatLng(37.37230584065902, 127.10791110992432),
          new naver.maps.LatLng(37.35975408751081, 127.10795402526855),
          new naver.maps.LatLng(37.359924641705476, 127.11576461791992),
          new naver.maps.LatLng(37.35931064479073, 127.12211608886719),
          new naver.maps.LatLng(37.36043630196386, 127.12293148040771),
          new naver.maps.LatLng(37.36354029942161, 127.12310314178465),
          new naver.maps.LatLng(37.365211629488016, 127.12456226348876),
          new naver.maps.LatLng(37.37544345085402, 127.11224555969238),
        ],
      ],
      fillColor: "#ff0000",
      fillOpacity: 0.3,
      strokeColor: "#ff0000",
      strokeOpacity: 0.6,
      strokeWeight: 3,
    });

    var polyline = new naver.maps.Polyline({
      map: map,
      path: [
        new naver.maps.LatLng(37.359924641705476, 127.1148204803467),
        new naver.maps.LatLng(37.36343797188166, 127.11486339569092),
        new naver.maps.LatLng(37.368520071054576, 127.11473464965819),
        new naver.maps.LatLng(37.3685882848096, 127.1088123321533),
        new naver.maps.LatLng(37.37295383612657, 127.10876941680907),
        new naver.maps.LatLng(37.38001321351567, 127.11851119995116),
        new naver.maps.LatLng(37.378546827477855, 127.11984157562254),
        new naver.maps.LatLng(37.376637072444105, 127.12052822113036),
        new naver.maps.LatLng(37.37530703574853, 127.12190151214598),
        new naver.maps.LatLng(37.371657839593894, 127.11645126342773),
        new naver.maps.LatLng(37.36855417793982, 127.1207857131958),
      ],
    });
  }, [draggable, zoomControl, keyboardShortcuts, mapTypeId]);

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
        <Button
          onClick={() => setKeyboardShortcuts(!keyboardShortcuts)}
          isActive={keyboardShortcuts}
        >
          keyboardShortcuts
        </Button>
        <Button onClick={() => setIsGray(!isGray)} isActive={isGray}>
          isGray
        </Button>
        <MapTypeIdListContainer>
          {mapTypeIdList.map((mapTypeId) => (
            <div onClick={() => setMapTypeId(mapTypeId)}>
              <Button>
                <input type="radio" name="mapTypeId" />
                <label>{mapTypeId}</label>
              </Button>
            </div>
          ))}
        </MapTypeIdListContainer>
      </ButtonWrapper>

      <Map ref={mapElement} isFilterGray={isGray} />
    </MapContainer>
  );
}

const MapContainer = styled.div`
  padding: 50px;
`;

const Map = styled.div<{ isFilterGray?: boolean }>`
  width: 100%;
  height: 800px;
  ${({ isFilterGray }) =>
    isFilterGray &&
    css`
      img[src^='http://nrbe.map.naver.net/styles/']
      {
        filter: grayscale(100);
      }
      img[src^='https://nrbe.pstatic.net/styles/']
      {
        filter: grayscale(100);
      }
    `}
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

const MapTypeIdListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
