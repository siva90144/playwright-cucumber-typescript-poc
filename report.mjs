import { AllureRuntime, CucumberJSAllureFormatter } from 'allure-cucumberjs';

function Reporter(options: any) {
  return new CucumberJSAllureFormatter(
    options,
    new AllureRuntime({ resultsDir: './allure-reports' }),
    {
      
     
    },
  );
}
Reporter.prototype = Object.create(CucumberJSAllureFormatter.prototype);
Reporter.prototype.constructor = Reporter;

exports.default = Reporter;