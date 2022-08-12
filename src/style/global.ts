import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root, .App {
        width: 100vw;
        height: 100vh;
        background: #eee;
    }

    body, h1, h2, h3, h4, h5, h6, a, input, button {
        font-family: Roboto, sans-serif;
    }
`
