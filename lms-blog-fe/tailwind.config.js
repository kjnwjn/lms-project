/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.html", "./src/**/*.{vue,js,jsx,ts,tsx}", "./node_modules/preline/dist/*.js"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            primary: "#2C1F4A",
            button: "#7F56D9",
            button2: "#FF5156",
            secondary: "#DADAF7",
            infor: "#584e75",
            item: "#381d74",
            textColor: "#D9ECFF",
            textColor2: "#B0B0D1",
            footer: "#493E65",
        },
        screens: {
            tablet: "640px",
            // => @media (min-width: 640px) { ... }

            laptop: "1024px",
            // => @media (min-width: 1024px) { ... }

            // desktop: "1280px",
            // // => @media (min-width: 1280px) { ... }
        },
    },
};
