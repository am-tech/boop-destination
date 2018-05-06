const filler = require('pdffiller');
const path = require('path');
const moment = require('moment');

// HACK: This is for demo purposes only
const exec = require("child_process").exec;

const fill = async (template, data) => {
  const templatesPath = path.resolve('templates/');
  const templatePath = path.join(templatesPath, template);
  const outputPath = './form.pdf';

  const mapping = {
    // TODO: This mapping should be a configuration file for each template
    'general.date': moment().format('YYYY-MM-DD'),
    'personal.ssn': data['Demographics']['SSN'],
    'personal.first_name': data['Demographics']['FirstName'],
    'personal.last_name': data['Demographics']['LastName'],
    'personal.middle_name': data['Demographics']['MiddleName'],
    'personal.middle_initial': (data['Demographics']['MiddleName'] || ' ').toUpperCase()[0],
    'personal.dob': data['Demographics']['DOB'],
    'personal.gender': data['Demographics']['Sex'] === 'Male' ? 'male' : 'female',
    'personal.marital_status': data['Demographics']['MaritalStatus'] === 'Married' ? 'married' : 'single',
    'personal.email': data['Demographics']['EmailAddresses'][0] || 'N/A',
    'personal.work_phone': data['Demographics']['PhoneNumber']['Home'] || '',
    'personal.mobile_phone': data['Demographics']['PhoneNumber']['Mobile'] || '',
    'personal.home_phone': data['Demographics']['PhoneNumber']['Home'] || '',
    'personal.address_line_1': data['Demographics']['Address']['StreetAddress'],
    'personal.address_city': data['Demographics']['Address']['City'],
    'personal.address_state': data['Demographics']['Address']['State'],
    'personal.address_zip': data['Demographics']['Address']['ZIP'],
    'personal.initials': data['Demographics']['FirstName'][0] + data['Demographics']['LastName'][0],
    'insurance.full_name': data['Demographics']['FirstName'] + data['Demographics']['LastName'],
    'insurance.dob': data['Demographics']['DOB'],
    'insurance.address_line_1': data['Demographics']['Address']['StreetAddress'],
    'insurance.address_city': data['Demographics']['Address']['City'],
    'insurance.address_state': data['Demographics']['Address']['State'],
    'insurance.address_zip': data['Demographics']['Address']['ZIP'],
    'insurance.relationship': 'self',
    'insurance.subscriber_name': data['Demographics']['FirstName'] + ' ' + data['Demographics']['LastName'],
    'insurance.subscriber_number': data['Insurances'][0]['PolicyNumber'] || '',
    'insurance.provider_name': data['Insurances'][0]['Company']['Name'] || '',
    'insurance.phone': data['Insurances'][0]['Company']['PhoneNumber'] || '',
    'insurance.group_name': data['Insurances'][0]['GroupName'] || '',
    'insurance.group_number': data['Insurances'][0]['GroupNumber'] || '',
    'owner.full_name': data['Demographics']['FirstName'] + data['Demographics']['LastName'],
    'owner.dob': data['Demographics']['DOB'],
    'owner.address_line_1': data['Demographics']['Address']['StreetAddress'],
    'owner.address_city': data['Demographics']['Address']['City'],
    'owner.address_state': data['Demographics']['Address']['State'],
    'owner.address_zip': data['Demographics']['Address']['ZIP'],
    'owner.relationship': 'self',
    'owner.full_name': data['Demographics']['FirstName'] + ' ' + data['Demographics']['LastName'],
    'owner.ssn': data['Demographics']['SSN'],
    'insurance.ssn': data['Demographics']['SSN'],
    'owner.work_phone': data['Demographics']['PhoneNumber']['Home'] || '',
    'owner.mobile_phone': data['Demographics']['PhoneNumber']['Mobile'] || '',
    'owner.home_phone': data['Demographics']['PhoneNumber']['Home'] || '',
    'owner.address_line_1': data['Demographics']['Address']['StreetAddress'],
    'owner.address_city': data['Demographics']['Address']['City'],
    'owner.address_state': data['Demographics']['Address']['State'],
    'owner.address_zip': data['Demographics']['Address']['ZIP'],
    'owner.initials': data['Demographics']['FirstName'][0] + data['Demographics']['LastName'][0],
  };

  return new Promise((resolve, reject) => {
    filler.fillForm(templatePath, outputPath, mapping, (err) => {
      exec('open ' + outputPath); // open file locally, macOS only

      resolve(outputPath);
    });
  });
};

module.exports = fill;