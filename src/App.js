import React, {useEffect, useState} from "react";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import WebPageLayout from "./core/WebPageLayout";
import AwsCustomAuthentication from "./core/AwsCustomAuthentication";


const App = () => {
    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    return authState === AuthState.SignedIn && user ? (
            <WebPageLayout user={user}/>
        ) : (
            <AwsCustomAuthentication/>
    );
}

export default App;
