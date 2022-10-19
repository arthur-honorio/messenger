import { createGlobalStyle } from "styled-components"
import { darken } from "polished"

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        background: #ddd;
        width: 100vw;
        height: 100vh;
    }

    body, h1, h2, h3, h4, h5, h6, a, input, button {
        font-family: Roboto, sans-serif;
    }

    form {
        border-radius: 10px;
        background: orchid;
        width: 600px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px;
        gap: 10px;
    }

    input, button, button.alt-button {
        width: 100%;
        height: 40px;
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        transition: all 8 ease-in-out !important;
    }

    input[type="file"] {
        padding-left: 100px;
    }

    input[type="file"], button {
        background-color: darkorchid;
        color: white;
        font-weight: bold;
        font-size: 14px;
    }

    button:hover {
        background-color: ${darken(0.05, "darkorchid")}
    }
    
    button.alt-button {
        background-color: white;
        color: black;
    }
    
    button.alt-button:hover {
        background-color: ${darken(0.08, "white")}
    }
`
