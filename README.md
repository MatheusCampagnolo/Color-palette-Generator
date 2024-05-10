# Color Palette Generator

## Description

This Color Palette Generator is a simple web application that allows users to generate color palettes quickly and intuitively. With a variety of options, users can create random palettes or choose from different color categories such as red, blue, orange, yellow, pink, and green. Additionally, they have the option to generate monochromatic palettes from a selected base color or a custom input color.

## Functionality

The logic behind the Color Palette Generator is relatively straightforward:

1. **Generating Palettes by Category**: When the user selects a color category and clicks the "generate by categories" button, the application generates a color palette based on the selected category. This is done by choosing a corresponding color generation function for the category and applying it to generate a palette of five unique colors.

2. **Generating Monochromatic Palettes**: If the user chooses to generate a monochromatic palette, they can select a predefined base color or input a custom color. The application then generates a palette of five color variations of the base color, maintaining the same hue and only altering the brightness.

3. **Interactivity**: Each color in the first displayed palette is clickable. When the user clicks on a color, it changes to a new randomly generated color while maintaining the same category or base color. Additionally, the hexadecimal code of the color is displayed and can be copied by clicking a button next to the color.

4. **Input Validation**: The application validates whether the user has selected a color category before generating the palette. Similarly, when generating a monochromatic palette, it checks if a valid base color has been selected or input by the user.

## Contribution

Feel free to contribute if you'd like to improve the project! Here are some improvement ideas you may consider:

- Adding more color categories to increase the variety of available palettes.
- Implementing functionality to save generated palettes or export them to different formats.
- Enhancing the user interface to make it more intuitive and user-friendly.
- Optimizing the JavaScript code to improve performance and efficiency.

## Testing

If you want to test this Color Palette Generator: https://matheuscampagnolo.github.io/Color-palette-Generator/

## License

This project is licensed under the [MIT License](LICENSE), which means you can use, modify, and distribute the code freely as long as you include the original license and acknowledge the project contributors.
