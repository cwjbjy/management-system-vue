export function title({
    text,
    color
}) {
    return {
        text,
        left: "center",
        textStyle: {
            color
        },
    }
}

export function grid() {
    return {
        bottom: "10%",
    }
}

export function tooltip(type, mode) {
    return {
        trigger: type,
        axisPointer: {
            type: mode || "shadow",
        },
    }
}

export function xAxis({
    data,
    color
}) {
    return {
        type: "category",
        data,
        axisLine: {
            show: true,
            lineStyle: {
                color,
            },
        },
        axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
                color,
            },
        },
        axisLabel: {
            show: true,
            color,
        },
        nameTextStyle: {
            color,
        },
    }
}

export function yAxis(color) {
    return {
        type: "value",
        scale: true,
        axisLine: {
            show: true,
            lineStyle: {
                color,
            },
        },
        axisTick: {
            show: true,
            lineStyle: {
                color,
            },
        },
        axisLabel: {
            show: true,
            color,
        },
        nameTextStyle: {
            color,
        },
    }
}

export function legend(color) {
    return {
        top: "30",
        left: "center",
        textStyle: {
            color,
        },
    }
}