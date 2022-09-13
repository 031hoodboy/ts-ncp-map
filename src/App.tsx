import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useImmer } from "use-immer";

const MAP_TYPE_ID_LIST = ["normal", "terrain", "satellite", "hybrid"];

const App = () => {
  const mapElement = useRef(null);

  const [state, setState] = useImmer({
    isGray: false,
    draggable: false,
    keyboardShortcuts: false,
    mapTypeId: "normal",
    zoom: {
      state: false,
      zoom: 14,
      minZoom: 14,
      maxZoom: 14,
    },
    location: {
      latitude: 37.4944382,
      longitude: 127.0126429,
    },
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

  const onKeyboardShortcuts = () => {
    setState((draft) => {
      draft.keyboardShortcuts = !draft.keyboardShortcuts;
    });
  };

  const onZoom = () => {
    setState((draft) => {
      if (!draft.zoom.state) {
        draft.zoom.zoom = 14;
        draft.zoom.minZoom = 10;
        draft.zoom.maxZoom = 21;
        draft.zoom.state = !draft.zoom.state;
      } else {
        draft.zoom.zoom = 14;
        draft.zoom.minZoom = 14;
        draft.zoom.maxZoom = 14;
        draft.zoom.state = !draft.zoom.state;
      }
    });
  };

  const onMapTypeId = (e: any) => {
    setState((draft) => {
      draft.mapTypeId = `${e}`;
    });
  };

  const onLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setState((draft) => {
        draft.location.latitude = position.coords.latitude;
        draft.location.longitude = position.coords.longitude;
      });
    });
  };

  const onMap = () => {
    onLocation();
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(
      state.location.latitude,
      state.location.longitude
    );
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: state.zoom.zoom,
      minZoom: state.zoom.minZoom,
      maxZoom: state.zoom.maxZoom,
      keyboardShortcuts: state.keyboardShortcuts,
      draggable: state.draggable,
      mapTypeId: state.mapTypeId,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(
        state.location.latitude,
        state.location.longitude
      ),
      map: map,
    });

    naver.maps.Event.addListener(map, "click", function (e) {
      marker.setPosition(e.latlng);
    });
  };

  useEffect(() => {
    onMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <MapContainer>
      <Title>ts-ncp-map</Title>
      <ButtonWrapper>
        <Button onClick={onDraggable} isActive={state.draggable}>
          Draggable
        </Button>
        <Button
          onClick={onKeyboardShortcuts}
          isActive={state.keyboardShortcuts}
        >
          keyboardShortcuts
        </Button>
        <Button onClick={onZoom} isActive={state.zoom.state}>
          zoom
        </Button>
        <Button onClick={onIsGray} isActive={state.isGray}>
          isGray
        </Button>
        <MapTypeIdListContainer>
          {MAP_TYPE_ID_LIST.map((mapTypeId) => (
            <Button onClick={() => onMapTypeId(mapTypeId)}>
              <label>
                <input type="radio" name="mapTypeId" />
                {mapTypeId}
              </label>
            </Button>
          ))}
        </MapTypeIdListContainer>
      </ButtonWrapper>

      <Map ref={mapElement} isFilterGray={state.isGray} />
    </MapContainer>
  );
};

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
        filter: grayscale(50);
      }
      img[src^='https://nrbe.pstatic.net/styles/']
      {
        filter: grayscale(50);
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
