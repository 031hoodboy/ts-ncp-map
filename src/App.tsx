import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useImmer } from "use-immer";

function App() {
  const mapElement = useRef(null);

  const mapTypeIdList = ["normal", "terrain", "satellite", "hybrid"];

  const [mapTypeId, setMapTypeId] = useState("normal");

  const [state, setState] = useImmer({
    isGray: false,
    draggable: false,
    zoomControl: false,
    keyboardShortcuts: false,
  });

  const onIsGray = () => {
    setState((draft) => {
      draft.isGray = !draft.isGray;
    });
  };

  const onDraggable = () => {
    setState((draft) => {
      draft.draggable = !draft.draggable;
    });
  };
  const onZoomControl = () => {
    setState((draft) => {
      draft.zoomControl = !draft.zoomControl;
    });
  };
  const onKeyboardShortcuts = () => {
    setState((draft) => {
      draft.keyboardShortcuts = !draft.keyboardShortcuts;
    });
  };

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(
      37.49450980317381,
      127.01270976617246
    );
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 14,
      zoomControl: state.zoomControl,
      keyboardShortcuts: state.keyboardShortcuts,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      draggable: state.draggable,
      mapTypeId: mapTypeId,
    };
    console.log(mapOptions.zoom?.toExponential);
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.49450980317381, 127.01270976617246),
      map: map,
    });

    naver.maps.Event.addListener(map, "click", function (e) {
      marker.setPosition(e.latlng);
    });
  }, [state]);

  return (
    <MapContainer>
      <Title>ts-ncp-map</Title>
      <ButtonWrapper>
        <Button onClick={onDraggable} isActive={state.draggable}>
          Draggable
        </Button>
        <Button onClick={onZoomControl} isActive={state.zoomControl}>
          ZoomControl
        </Button>
        <Button
          onClick={onKeyboardShortcuts}
          isActive={state.keyboardShortcuts}
        >
          keyboardShortcuts
        </Button>
        <Button onClick={onIsGray} isActive={state.isGray}>
          isGray
        </Button>
        <MapTypeIdListContainer>
          {mapTypeIdList.map((mapTypeId) => (
            <div onClick={() => setMapTypeId(mapTypeId)}>
              <Button>
                <label>
                  <input type="radio" name="mapTypeId" />
                  {mapTypeId}
                </label>
              </Button>
            </div>
          ))}
        </MapTypeIdListContainer>
      </ButtonWrapper>

      <Map ref={mapElement} isFilterGray={state.isGray} />
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
