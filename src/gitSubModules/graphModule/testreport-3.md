# Testreport 3 - Automated tests suite for the GraphDrawer component

This is a test report for the GraphDrawer component and its included classes.
The test suite is written in Jest for the jsdom test environment and can after installation of the npm packages be run straight out of the repo with the command `npm run test`.

Test: Jest
Version: 1.0.0
Test Environment: Windows 11 22H2, Chrome 117, Node 20.6.0, NPM 9.8.1, Jest 29.7.0, Jest-environment-jsdom 29.7.0
Date: 2023-09-22
Tester: Jimmy Karlsson

## Test Report for jk224jvGraphdrawer class, GraphDrawer component

  GraphDrawer Class
  custom element
      √ should be defined (6 ms)
      √ should have a shadow root (1 ms)
      √ should have a canvas element (7 ms)
      √ should have a canvas element with the id "canvas" (2 ms)
      √ the canvas element should have a width and height of 100% (1 ms)
    constructor
      √ should have a numberOfStepsOnYAxis property (1 ms)
      √ numberOfStepsOnYAxis should be 10 since 10 is the base of the number system. (1 ms)
      √ should have a maxNumberOfStepsOnXAxis property (1 ms)
      √ should have a fontSettings property (1 ms)
      √ fontSettings should be an instance of FontSettings (1 ms)
      √ should have a colorSettings property (1 ms)
      √ colorSettings should be an instance of ColorSettings (1 ms)
      √ should have an axisTitles property (1 ms)
      √ axisTitles should be an instance of AxisTitles (1 ms)
    verifyDatasetIntegrity
      √ should throw an error if the dataset is not an array (5 ms)
      √ should throw an error if the dataset is null (1 ms)
      √ should throw an error if the dataset is undefined (1 ms)
      √ should throw an error if the dataset is empty (1 ms)
      √ should throw an error if the dataset contains a non-number (2 ms)
      √ should not throw an error if the dataset is valid
    render
      √ should have a render method (3 ms)
      √ should call the verifyDatasetIntegrity method (2 ms)
    setters
      setColors
        √ should have a setColors method (1 ms)
        √ should throw TypeError if the argument is not an array of objects (4 ms)
        √ should throw TypeError on faulty objects in the array (4 ms)
        √ should only affect the colors that are passed in (1 ms)
      setAxisTitles
        √ should have a setAxisTitles method (1 ms)
        √ should throw TypeError if the argument is not an object (3 ms)
        √ should throw TypeError if the argument is an empty object (4 ms)
        √ should throw TypeError if either argument contains a non-string (6 ms)
        √ should throw TypeError if a non-valid property is passed in (3 ms)
        √ should set the axisTitles property (1 ms)
      setFontSettings
        √ should have a setFontSettings method
        √ should throw TypeError if the argument is not an object (2 ms)
        √ should throw TypeError if the argument is an empty object
        √ should throw TypeError if any of the properties are missing or invalid (12 ms)
        √ should throw TypeError if there are any extra properties (1 ms)
        √ should set the fontSettings property (1 ms)
      set Size
        √ should have a setSize method (1 ms)
        √ should throw TypeError if the argument is not an object (3 ms)
        √ should throw TypeError if the argument is an empty object (1 ms)
        √ should throw TypeError if the argument does not contain a width or height property (1 ms)
        √ should throw TypeError if any other property is passed in (3 ms)
        √ should throw TypeError if the width or height property is not a string (8 ms)
        √ should throw TypeError if the width or height property is not a valid css value (2 ms)
        √ should set the width and height of the canvas element (2 ms)

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Report for ColorSettings Class

  ColorSettings
    √ should throw a TypeError if graphLineColor is not a string (7 ms)
    √ should throw a TypeError if graphLineColor is null (1 ms)
    √ should throw a TypeError if graphLineColor is undefined (1 ms)
    √ should throw a TypeError if graphLineColor is not a valid color (1 ms)
    √ should throw a TypeError if graphDotColor is not a string (1 ms)
    √ should throw a TypeError if graphDotColor is null (1 ms)
    √ should throw a TypeError if graphDotColor is undefined (1 ms)
    √ should throw a TypeError if graphDotColor is not a valid color (1 ms)
    √ should throw a TypeError if zeroLineColor is not a string (1 ms)
    √ should throw a TypeError if zeroLineColor is null (1 ms)
    √ should throw a TypeError if zeroLineColor is undefined (1 ms)
    √ should throw a TypeError if zeroLineColor is not a valid color (1 ms)
    √ should throw a TypeError if axisColor is not a string (1 ms)
    √ should throw a TypeError if axisColor is null (1 ms)
    √ should throw a TypeError if axisColor is undefined
    √ should throw a TypeError if axisColor is not a valid color
    √ should throw a TypeError if labelColor is not a string
    √ should throw a TypeError if labelColor is null (1 ms)
    √ should throw a TypeError if labelColor is undefined (1 ms)
    √ should throw a TypeError if labelColor is not a valid color
    √ should throw a TypeError if titleColor is not a string
    √ should throw a TypeError if titleColor is null
    √ should throw a TypeError if titleColor is undefined (1 ms)
    √ should throw a TypeError if titleColor is not a valid color (1 ms)
    √ should throw a TypeError if backgroundColor is not a string (1 ms)
    √ should throw a TypeError if backgroundColor is null (1 ms)
    √ should throw a TypeError if backgroundColor is undefined (1 ms)
    √ should throw a TypeError if backgroundColor is not a valid color (1 ms)
    √ should set the graphLineColor property
    √ should set the graphDotColor property
    √ should set the zeroLineColor property
    √ should set the axisColor property
    √ should set the labelColor property (1 ms)
    √ should set the titleColor property
    √ should set the backgroundColor property

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Report for GraphProperties Class

  GraphProperties
    √ should throw a TypeError if dataset is not an array (6 ms)
    √ should throw a TypeError if dataset is null
    √ should throw a TypeError if dataset is undefined
    √ should throw an Error if dataset is empty
    √ should throw a TypeError if dataset contains a none-number (1 ms)
    √ should set the max property (1 ms)
    √ should set the min property (1 ms)
    √ should set the range property
    √ should set the primeAdjustedLength property (4 ms)

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Report for FontSettings Class

  FontSettings
    √ should throw a TypeError if font is not a string (6 ms)
    √ should throw a TypeError if fontSizeLabel is not a number
    √ should throw a TypeError if fontSizeTitle is not a number
    √ should throw a TypeError if font is null
    √ should throw a TypeError if fontSizeLabel is null
    √ should throw a TypeError if fontSizeTitle is null
    √ should throw a TypeError if font is undefined (4 ms)
    √ should throw a TypeError if fontSizeLabel is undefined (1 ms)
    √ should throw a TypeError if fontSizeTitle is undefined (1 ms)
    √ getters should return ctx style properties as string (1 ms)

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Report for GraphAndCanvasData Class

  GraphAndCanvasData
    constructor
      √ should throw a TypeError if canvasProperties is not a valid CanvasProperties object (1 ms)
      √ should throw a TypeError if graphProperties is not a valid GraphProperties object
      √ should throw a TypeError if dataset is not a valid array (1 ms)
      √ should throw a TypeError if maxNumberOfLabelsOnXAxis is not a valid number (3 ms)
      √ should throw a TypeError if numberOfLabelsOnYAxis is not a valid number
      √ should throw a TypeError if fontSettings is not a valid FontSettings object (1 ms)
      √ should throw a TypeError if colorSettings is not a valid ColorSettings object
      √ should throw a TypeError if ctx is not a valid context
      √ should throw a TypeError if axisTitles is not a valid AxisTitles object (1 ms)

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Report for AxisTitles Class

  AxisTitles
    constructor
      √ should throw a TypeError if xAxis is not a string (9 ms)
      √ should throw a TypeError if yAxis is not a string
      √ should throw a TypeError if xAxis is null
      √ should throw a TypeError if yAxis is null
      √ should throw a TypeError if xAxis is undefined
      √ should throw a TypeError if yAxis is undefined
      √ should set the xAxis property
      √ should set the yAxis property (1 ms)

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Report for CanvasProperties Class

  CanvasProperties
    constructor
      √ should throw a TypeError if canvas is not a canvas element (5 ms)
      √ should throw a TypeError if canvas is null (1 ms)
      √ should throw a TypeError if canvas is undefined

### Expected output from the test suite

All tests should pass.

### Actual output from the test suite

All tests passed.

## Test Results

Test Suits: 7 passed, 7 total
Tests:      121 passed, 121 total
