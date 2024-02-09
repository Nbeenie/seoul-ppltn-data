import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});

  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata_ppltn/1/5/${location}`;

  const searchPopulation = async (e) => {
    if (e.key === "Enter") {
      try {
        const { data } = await axios.get(url); // Destructure 'data' from the response
        console.log(data);
        setResult(data); // Set the result state
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          placeholder="장소를 입력하세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchPopulation}
        />
        {result["SeoulRtd.citydata_ppltn"] &&
          result["SeoulRtd.citydata_ppltn"].length > 0 && ( // Check if the result contains data
            <ResultWrap>
              {/* <div className="place">
                {result["SeoulRtd.citydata_ppltn"][0]["AREA_NM"]}
              </div> */}
              <div className="level">
                {result["SeoulRtd.citydata_ppltn"][0]["AREA_CONGEST_LVL"]}
              </div>
              <div className="message">
                {result["SeoulRtd.citydata_ppltn"][0]["AREA_CONGEST_MSG"]}
              </div>
            </ResultWrap>
          )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }

  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  border: 1px black solid;
  padding: 10px;
  border-radius: 8px;

  // .place {
  //   font-size: 24px;
  // }

  .level {
    font-size: 60px;
    margin: 10px 0;
  }

  .message {
    font-size: 20px;
    text-align: left;
    margin: 20px 0;
  }
`;
