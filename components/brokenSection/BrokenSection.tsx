import React from "react";
import Convergence from "@/app/utilizes/convergence/Convergence";
import BrokenVideo from "@/app/utilizes/convergence/BrokenVideo";

const BrokenSection = () => {
  return (
    <div className="CuHomeConvergence_wrapper__7Qlyb CuHomeConvergence_v4Wrapper__EslwC v4">
      <div className="CuHomeConvergence_innerWrapper__2RIL7">
        <div className="CuHomeConvergence_cardContainer__o997M">
          <div className="CuHomeConvergence_card__6_kE8 CuHomeConvergence_brokenCard__mvBMW">
            <div className="CuHomeConvergence_cardContent__pc1aQ">
              <h2 className="CuHomeConvergence_title__7Ak16 heading-md">
                Work is broken.
              </h2>
              <div className="CuMarkdown_wrapper__0ea92 CuHomeConvergence_description__Nj0_R">
                <p className="paragraph">
                  App-switching fragments work, steals time, and kills
                  productivity.
                </p>
              </div>
            </div>
            <div>
              <BrokenVideo />
            </div>
          </div>
        </div>
        <div className="CuHomeConvergence_fixedCard__O0QfI">
          <h2 className="CuHomeConvergence_title__7Ak16 heading-md">
            Let's fix it.
          </h2>
          <div className="CuMarkdown_wrapper__0ea92 CuHomeConvergence_description__Nj0_R">
            <p className="paragraph">
              With all your projects, knowledge, and conversations in one app,
              everything just clicks.
            </p>
          </div>
          <div className="CuHomeConvergence_actionButtonContainer__odSj_">
            <div>
              <button className="CuButton_button__2XIwY CuButton_buttonMd__jcKmu CuButton_buttonShadow__wF2uA CuButton_v3__5hpJh CuButton_buttonStandard__QN0mF CuHomeConvergence_actionButton__Mm18D rounded-md text-lg">
                <span>Get started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
            <div className="CuHomeConvergence_actionButtonDescription__u5F45">
              converge over 50+ <br /> different apps
            </div>
          </div>
          <div>
            <button className="CuButton_button__2XIwY CuButton_buttonShadow__wF2uA CuHomeConvergence_letsFixItButton__gnGUB">
              <span>
                <div>
                  <Convergence />
                </div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokenSection;
