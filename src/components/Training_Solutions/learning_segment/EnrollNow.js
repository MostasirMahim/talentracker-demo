"use client";
import styled from "styled-components";
const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    background: linear-gradient(to right, #67e8f9, #2563eb);
    color: white;
    font-family: inherit;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 1.5em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 3.2em;
    padding-right: 3.3em;
    cursor: pointer;
  }

  .cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #1489bc;
    right: 0.3em;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }
`;
const EnrollButton = ({ isEnrolling, link }) => {
  return (
    <StyledWrapper>
      <button
        className="cssbuttons-io-button"
        disabled={isEnrolling}
        onClick={() => window.open(link, "_blank")}
      >
        {isEnrolling ? "Enrolling..." : "Enroll Now"}
        <div className="icon">
          <svg
            height={24}
            width={24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

export default EnrollButton;
