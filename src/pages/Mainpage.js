import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  isCheckedState,
  numParticipantsState,
  showAgreementState,
} from "../Atoms";
import axios from "axios";
import "./Mainpage.css";
import ComatHeader from "../components/ComatHeader";
import Footer from "./../components/Footer";
import AgreementBox from "../components/AgreementBox";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);
  const [numParticipants, setNumParticipants] =
    useRecoilState(numParticipantsState);
  const [showAgreement, setShowAgreement] = useRecoilState(showAgreementState);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleAgreementClick = () => {
    setShowAgreement(true);
  };
  const handleCloseAgreement = () => {
    setShowAgreement(false);
  };

  const handleSubmit = () => {
    if (isChecked) {
      navigate("/Form");
    } else {
      alert("개인정보 수집 동의에 체크해주세요.");
    }
  };
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("https://onesons.site/participations");
        setNumParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [setNumParticipants]);
  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="content">
        {/* <h4
          style={{ textAlign: "center", marginTop: "40px", color: "#FF4D61" }}
        >
          현재 이벤트 진행중!
        </h4> */}
        <img
          src={process.env.PUBLIC_URL + `assets/helloemoji.png`}
          alt="사람 이미지"
          style={{
            width: "80%",
            height: "auto",
            paddingTop: "30px",
          }}
        />
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/logoblack.png`}
            alt="로고이미지"
            style={{
              width: "75%",
              height: "auto",
              marginTop: "20px",
            }}
          />
        </div>
        {numParticipants !== null && (
          <div
            style={{
              fontSize: "25px",
              fontWeight: "w600",
              marginTop: "5px",
            }}
          >
            현재{" "}
            <span style={{ color: "#FF4D61", fontWeight: "900" }}>
              {numParticipants}
            </span>
            명 참여중이에요!
          </div>
        )}
        <div className="checkbox-label">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              style={{
                width: "13px",
                textAlign: "center",
              }}
            />
            <div
              style={{
                paddingTop: "2px",
              }}
            >
              개인정보 수집 및 이용에 대해 동의합니다
            </div>
          </label>
        </div>
        <div>
          <button className="privacy-button" onClick={handleAgreementClick}>
            개인정보 수집 활용 동의서
          </button>
        </div>
        {showAgreement && (
          <AgreementBox handleCloseAgreement={handleCloseAgreement} />
        )}
        <div>
          <button className="submit-button" onClick={handleSubmit}>
            시작하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
