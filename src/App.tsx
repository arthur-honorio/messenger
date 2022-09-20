import { Messenger } from "./components/Messenger"
import GlobalStyle from "./style/global"
import { MuiSnackbar } from "./components/Alert/MuiSnackbar"

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <MuiSnackbar />
            <Messenger />
        </div>
    )
}

export default App
