import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
function WelcomeMessage({ user, loggedIn }) {
    const [displayMessage, setDisplaymessage] = useState("false");

    return (
        <div className="ml-3">
            <h1 className="hidden">&nbsp;</h1>
        </div>
    )
}

export default WelcomeMessage;

