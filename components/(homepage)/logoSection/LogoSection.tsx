import Image from "next/image";
import React from "react";

import logitech from "@/public/homePageAssets/logos/logitech.svg";
import american from "@/public/homePageAssets/logos/american.svg";
import atandt from "@/public/homePageAssets/logos/atandt.svg";
import cartoon from "@/public/homePageAssets/logos/cartoon.svg";
import chick from "@/public/homePageAssets/logos/chick.svg";
import datadog from "@/public/homePageAssets/logos/datadog.svg";
import paramount from "@/public/homePageAssets/logos/paramount.svg";
import sephora from "@/public/homePageAssets/logos/sephora.svg";  
import siemens from "@/public/homePageAssets/logos/siemens.svg";  
import wayfair from "@/public/homePageAssets/logos/wayfair.svg";
import zillow from "@/public/homePageAssets/logos/zillow.svg";



const LogoSection = () => {
  return (
    <div id="logo" >
      <div className="CuJoinTeamsBanner_wrapper__WxUX7 HeroWorkspaceBuilder_trustedBy__YAon2 v4 pt-4">
        <div className="CuMarkdown_wrapper__0ea92 CuJoinTeamsBanner_joinTeamsHeader__xKvYk v4">
          <p className="text-sm">Trusted by the world’s leading businesses</p>
        </div>
        <div className="CuJoinTeamsBanner_logoSlider__h564a">
          <ul className="CuJoinTeamsBanner_logoList__SUYOO">
            {/* original logos */}
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={logitech} alt="Logitech" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={american} alt="American" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={atandt} alt="AT&T" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={cartoon} alt="Cartoon" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={chick} alt="Chick" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={datadog} alt="Datadog" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={paramount} alt="Paramount" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={sephora} alt="Sephora" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={siemens} alt="Siemens" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={wayfair} alt="Wayfair" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={zillow} alt="Zillow" width="100" height="16" />
            </li>
            {/* duplicate logos for infinite loop */}
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src="/homePageAssets/logos/logitech.svg" alt="Logitech" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={american} alt="American" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={atandt} alt="AT&T" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={cartoon} alt="Cartoon" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={chick} alt="Chick" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={datadog} alt="Datadog" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={paramount} alt="Paramount" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={sephora} alt="Sephora" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={siemens} alt="Siemens" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={wayfair} alt="Wayfair" width="100" height="16" />
            </li>
            <li className="CuJoinTeamsBanner_logoListItem__krzmR">
              <Image src={zillow} alt="Zillow" width="100" height="16" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
