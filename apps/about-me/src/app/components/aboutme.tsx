// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useThemeContext } from 'ShellApp/theme';

export default function AboutMe() {
    const { theme } = useThemeContext();

    console.log(theme);

    return (
        <div>About me.</div>
    )
}