const getColor = (value) => {
    var hue = ((1 - value) * 120).toString(10);
    const color = ["hsl(", hue, ",100%,50%)"].join("");
    return color;
}

module.exports = { getColor };