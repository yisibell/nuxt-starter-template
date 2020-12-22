import questionnaire from './modules/questionnaire'

export default (request) => ({
  questionnaire: questionnaire(request),
})
