import React, { useEffect, useRef, useState } from "react";
import ControlManager from "./ControlManager";

import Subscriber, { publish } from "./Pubsub";

function MainPage() {
    ControlManager();
    return (<>
        <div>
        <Subscriber topic={"alertTopic"}/>
        </div>
        </>);
}
export default MainPage;