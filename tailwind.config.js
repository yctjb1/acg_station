/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
// https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration
// 暗模式功能现在默认使用 media 策略启用
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            slate: colors.slate, // 灰蓝色
            gray: colors.trueGray, // 灰色
            zinc: colors.zinc, // 灰白色
            neutral: colors.neutral, // 中性色?
            stone: colors.stone, // 灰褐色
            red: colors.red,
            orange: colors.orange, // 橙色
            amber: colors.amber, // 琥珀色(浅橙色?)
            yellow: colors.yellow,
            lime: colors.lime, // 青柠绿
            green: colors.green,
            emerald: colors.emerald, // 翡翠绿
            teal: colors.teal, // 蓝绿色
            cyan: colors.cyan, // 青色
            sky: colors.sky, // 亮蓝色
            blue: colors.blue,
            indigo: colors.indigo, // 淡紫色(蓝紫色)
            violet: colors.violet, // 紫罗兰色(靛蓝紫色)
            purple: colors.purple, // 粉紫色(玫瑰紫色”)
            fuchsia: colors.fuchsia, // 紫红色(洋红色)
            pink: colors.pink, // 粉红色
            rose: colors.rose, // 深红色(鲜红色)
        },
        borderRadius: {
            none: "0",
            sm: ".125rem",
            DEFAULT: ".25rem",
            lg: ".5rem",
            full: "9999px", //.rounded-full { border-radius: 9999px }
        },
        zIndex: {
            "-10": "-10", //会生成像 -z-10 这样的类
            0: 0,
            10: 10,
            20: 20,
            30: 30,
            40: 40,
            50: 50,
            25: 25,
            50: 50,
            75: 75,
            100: 100,
            auto: "auto",
        },
    },
    variants: {
        extend: {
            accessibility: ["responsive", "focus-within", "focus"],
            alignContent: ["responsive"],
            alignItems: ["responsive"],
            alignSelf: ["responsive"],
            animation: ["responsive", "motion-safe", "motion-reduce"],
            appearance: ["responsive"],
            backdropBlur: ["responsive"],
            backdropBrightness: ["responsive"],
            backdropContrast: ["responsive"],
            backdropFilter: ["responsive"],
            backdropGrayscale: ["responsive"],
            backdropHueRotate: ["responsive"],
            backdropInvert: ["responsive"],
            backdropOpacity: ["responsive"],
            backdropSaturate: ["responsive"],
            backdropSepia: ["responsive"],
            backgroundAttachment: ["responsive"],
            backgroundBlendMode: ["responsive"],
            backgroundClip: ["responsive"],
            backgroundColor: [
                "responsive",
                "dark",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
                "active",
                "group-focus",
                "checked",
                "odd",
                "even",
            ],
            backgroundImage: ["responsive"],
            backgroundOpacity: [
                "responsive",
                "dark",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
            ],
            backgroundPosition: ["responsive"],
            backgroundRepeat: ["responsive"],
            backgroundSize: ["responsive"],
            backgroundOrigin: ["responsive"],
            blur: ["responsive"],
            borderCollapse: ["responsive"],
            borderColor: [
                "responsive",
                "dark",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
                "checked",
            ],
            borderOpacity: [
                "responsive",
                "dark",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
            ],
            borderRadius: ["responsive"],
            borderStyle: ["responsive"],
            borderWidth: ["responsive", "first", "last"],
            boxDecorationBreak: ["responsive"],
            boxShadow: [
                "responsive",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
            ],
            boxSizing: ["responsive"],
            brightness: ["responsive"],
            clear: ["responsive"],
            container: ["responsive"],
            contrast: ["responsive"],
            cursor: ["responsive"],
            display: ["responsive"],
            divideColor: ["responsive", "dark", "group-hover", "hover"],
            divideOpacity: ["responsive", "dark"],
            divideStyle: ["responsive"],
            divideWidth: ["responsive"],
            dropShadow: ["responsive"],
            fill: ["responsive"],
            filter: ["responsive"],
            flex: ["responsive"],
            flexDirection: ["responsive"],
            flexGrow: ["responsive", "hover", "focus"],
            flexShrink: ["responsive", "hover", "focus"],
            flexWrap: ["responsive", "hover", "focus"],
            float: ["responsive"],
            fontFamily: ["responsive"],
            fontSize: ["responsive"],
            fontSmoothing: ["responsive"],
            fontStyle: ["responsive"],
            fontVariantNumeric: ["responsive"],
            fontWeight: ["responsive"],
            gap: ["responsive"],
            gradientColorStops: ["responsive", "dark", "hover", "focus"],
            grayscale: ["responsive"],
            gridAutoColumns: ["responsive"],
            gridAutoFlow: ["responsive"],
            gridAutoRows: ["responsive"],
            gridColumn: ["responsive"],
            gridColumnEnd: ["responsive"],
            gridColumnStart: ["responsive"],
            gridRow: ["responsive"],
            gridRowEnd: ["responsive"],
            gridRowStart: ["responsive"],
            gridTemplateColumns: ["responsive"],
            gridTemplateRows: ["responsive"],
            height: ["responsive"],
            hueRotate: ["responsive"],
            inset: ["responsive"],
            invert: ["responsive"],
            isolation: ["responsive"],
            justifyContent: ["responsive"],
            justifyItems: ["responsive"],
            justifySelf: ["responsive"],
            letterSpacing: ["responsive"],
            lineHeight: ["responsive"],
            listStylePosition: ["responsive"],
            listStyleType: ["responsive"],
            margin: ["responsive"],
            maxHeight: ["responsive"],
            maxWidth: ["responsive"],
            minHeight: ["responsive"],
            minWidth: ["responsive"],
            mixBlendMode: ["responsive"],
            objectFit: ["responsive"],
            objectPosition: ["responsive"],
            opacity: [
                "responsive",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
                "disabled",
            ],
            order: ["responsive"],
            outline: ["responsive", "focus-within", "focus"],
            overflow: ["responsive"],
            overscrollBehavior: ["responsive"],
            padding: ["responsive"],
            placeContent: ["responsive"],
            placeItems: ["responsive"],
            placeSelf: ["responsive"],
            placeholderColor: ["responsive", "dark", "focus"],
            placeholderOpacity: ["responsive", "dark", "focus"],
            pointerEvents: ["responsive"],
            position: ["responsive"],
            resize: ["responsive"],
            ringColor: ["responsive", "dark", "focus-within", "focus"],
            ringOffsetColor: ["responsive", "dark", "focus-within", "focus"],
            ringOffsetWidth: ["responsive", "focus-within", "focus"],
            ringOpacity: ["responsive", "dark", "focus-within", "focus"],
            ringWidth: ["responsive", "focus-within", "focus"],
            rotate: ["responsive", "hover", "focus"],
            saturate: ["responsive"],
            scale: ["responsive", "hover", "focus"],
            sepia: ["responsive"],
            skew: ["responsive", "hover", "focus"],
            space: ["responsive"],
            stroke: ["responsive"],
            strokeWidth: ["responsive"],
            tableLayout: ["responsive"],
            textAlign: ["responsive"],
            textColor: [
                "responsive",
                "dark",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
                "visited",
            ],
            textDecoration: [
                "responsive",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
                "focus-visible",
            ],
            textOpacity: [
                "responsive",
                "dark",
                "group-hover",
                "focus-within",
                "hover",
                "focus",
            ],
            textOverflow: ["responsive"],
            textTransform: ["responsive"],
            transform: ["responsive"],
            transformOrigin: ["responsive"],
            transitionDelay: ["responsive"],
            transitionDuration: ["responsive"],
            transitionProperty: ["responsive"],
            transitionTimingFunction: ["responsive"],
            translate: ["responsive", "hover", "focus"],
            userSelect: ["responsive"],
            verticalAlign: ["responsive"],
            visibility: ["responsive"],
            whitespace: ["responsive"],
            width: ["responsive"],
            wordBreak: ["responsive"],
            zIndex: ["responsive", "focus-within", "focus", "hover", "active"],
        },
    },
    // 除了直接在 CSS 文件中编写组件类外，您还可以通过编写自己的插件将组件类添加到 Tailwind 中
    // https://www.tailwindcss.cn/docs/extracting-components
    plugins: [],
    // https://mui.com/material-ui/guides/interoperability/#tailwind-css
    corePlugins: {
        preflight: false, //删除 Tailwind CSS 的预检样式，以便它可以改用 MUI 的预检样式
    },
    important: "#root",
};
