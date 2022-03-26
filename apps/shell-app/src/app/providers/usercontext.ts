import React from "react";

enum ThemeMode {
    Light = "Light",
    Dark = "Dark"
}

interface IUserContext {
    theme: ThemeMode;
}

const DefaultUserContext = {
    Theme: ThemeMode.Light,
    ChangeTheme: (mode: ThemeMode) => {} 
}

const UserContext = React.createContext(DefaultUserContext);

export { DefaultUserContext };

export default UserContext;