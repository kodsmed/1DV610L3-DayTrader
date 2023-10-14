import ValidationCollection from "validation-collection"

export class Validators {
  verifyDatasetIntegrity(dataset) {
    const validators = new ValidationCollection({ minimumLength: 2 })
    if (!validators.isArray.ofNumbers(dataset) || !validators.isArray.withMinimumLength(dataset)) {
      throw new TypeError(validators.reportAsString)
    }
  }

  validateAxisTitles(axisTitles) {
    const validProperties = ['xAxis', 'yAxis']
    const validators = new ValidationCollection({ validProperties: validProperties, minimumLength: 1, validValueTypes: ['string'] })

    if(!validators.isObject.thatMayHaveProperties(axisTitles)
        || !validators.isObject.withMinimumLength(axisTitles)
        || !validators.isObject.thatMustHaveSanctionedValueTypes(axisTitles)
    ) {
      throw new TypeError(validators.reportAsString)
    }
  }

  validateXAxisLabels(labels) {
    const validators = new ValidationCollection()
    if (!validators.isArray.ofStrings(labels)) {
      throw new TypeError(validators.reportAsString)
    }
  }

  validateColorSettings(colorSettings) {
    const validColorStrings = ['red', 'green', 'lime', 'blue', 'yellow', 'orange', 'purple', 'black', 'gray', 'white']
    const validColorProperties = ['graphLineColor', 'graphDotColor', 'zeroLineColor', 'axisColor', 'labelColor', 'titleColor', 'backgroundColor']
    let validators = new ValidationCollection({ minimumLength: 1 })
    if (!validators.isArray.withMinimumLength(colorSettings)) {
      throw new TypeError(validators.reportAsString)
    }

    validators = new ValidationCollection({ validProperties: validColorProperties, validValues: validColorStrings })
    if(!validators.isArray.ofObjects(colorSettings)) {
      throw new TypeError(validators.reportAsString)
    }

    for (const colorSetting of colorSettings) {
      if (!validators.isObject.thatMayHaveProperties(colorSetting)) {
        throw new TypeError(validators.reportAsString)
      }
      if (!validators.isObject.thatMustHaveSanctionedValues(colorSetting)) {
        throw new TypeError(validators.reportAsString)
      }
    }
  }

  validateFontSettings(fontSettings) {
    const validProperties = ['fontFamily', 'fontSizeLabel', 'fontSizeTitle']
    const validators = new ValidationCollection({ validProperties: validProperties })
    if(!validators.isObject.thatMustHaveProperties(fontSettings)){
      throw new TypeError(validators.reportAsString)
    }

    if (!validators.isString(fontSettings.fontFamily)) {
      throw new TypeError('fontFamily: ' + validators.reportAsString)
    }
    if (!validators.isNumber.thatIsPositive(fontSettings.fontSizeLabel)) {
      throw new TypeError('labelFontSize: ' + validators.reportAsString)
    }
    if (!validators.isNumber.thatIsPositive(fontSettings.fontSizeTitle)) {
      throw new TypeError('titleFontSize: ' + validators.reportAsString)
    }
    if(fontSettings.fontFamily.trim() == '') {
      throw new TypeError('fontFamily value must not be empty')
    }
  }

  validateSizeObject(size) {
    const validProperties = ['width', 'height']
    const validators = new ValidationCollection({name: "sizeObject", validProperties: validProperties, minimumLength: 2 })
    if(!validators.isObject.thatMustHaveProperties(size)){
      throw new TypeError(validators.reportAsString)
    }

    if (!validators.isString.withMinimumLength(size.width)
        || (!validators.isString.thatEndsWith(size.width, '%') && !validators.isString.thatEndsWith(size.width, 'px')
        || !validators.isString.withMinimumLength(size.height)
        || (!validators.isString.thatEndsWith(size.height, '%') && !validators.isString.thatEndsWith(size.height, 'px'))
    )) {
      throw new TypeError(validators.reportAsString)
    }
  }
}