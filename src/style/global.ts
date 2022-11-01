import { createGlobalStyle } from "styled-components"
import { darken, lighten } from "polished"

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
        background: darkcyan;
        width: 600px;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px;
        gap: 10px;
        position: relative;

        svg {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 25px;
            color: white;
            cursor: pointer;
        }

        footer {
            margin-top: 10px;
            display: flex;
            width: 100%;
            gap: 10px;
        }

        h2 {
            color: white;
        }
    }

    input, button, button.alt-button, label.fake-button {
        width: 100%;
        height: 40px;
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        text-align: center;
        transition: all 8 ease-in-out !important;
    }

    button, label.fake-button {
        background-color: orchid;
        color: white;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }

    button:hover, label.fake-button:hover {
        background-color: ${lighten(0.05, "darkorchid")};
        box-shadow: 0 0 10px ${darken(0.05, "darkorchid")};
    }
    
    button.alt-button {
        background-color: white;
        color: darkgray;
    }
    
    button.alt-button:hover {
        background-color: ${darken(0.08, "white")}
    }

    button:disabled {
        background-color: gray !important;
        color: darkgray;
        cursor: progress !important;
    }
`
