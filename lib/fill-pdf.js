const filler = require('pdffiller');
const fs = require('fs');
const path = require('path');

const exec = require("child_process").exec;

const fill = async (template, data) => {
  const templatesPath = path.resolve('tests/fixtures/');
  const templatePath = path.join(templatesPath, template);
  const outputPath = './form.pdf';

  const mapping = {
    'personal.ssn': data['Demographics']['SSN'],
    'personal.first_name': data['Demographics']['FirstName'],
    'personal.last_name': data['Demographics']['LastName'],
    'personal.middle_initial': (data['Demographics']['MiddleName'] || ' ').toUpperCase()[0],
    'personal.dob': data['Demographics']['DOB'],
    'personal.gender': data['Demographics']['Sex'] === 'Male' ? 'male' : 'female',
    'personal.marital_status': data['Demographics']['MaritalStatus'] === 'Married' ? 'married' : 'none',
    'personal.email': data['Demographics']['EmailAddresses'][0] || 'N/A',
    'personal.work_phone': data['Demographics']['PhoneNumber']['Home'] || '',
    'personal.mobile_phone': data['Demographics']['PhoneNumber']['Mobile'] || '',
    'personal.home_phone': data['Demographics']['PhoneNumber']['Home'] || '',
    'personal.address_line_1': data['Demographics']['Address']['StreetAddress'],
    'personal.address_city': data['Demographics']['Address']['City'],
    'personal.address_state': data['Demographics']['Address']['State'],
    'personal.address_zip': data['Demographics']['Address']['ZIP'],
    'insurance.relationship': 'self',
    'insurance.subscriber_name': data['Demographics']['FirstName'] + ' ' + data['Demographics']['LastName'],
    'insurance.subscriber_number': data['Insurances'][0]['PolicyNumber'] || '',
    'insurance.provider_name': data['Insurances'][0]['Company']['Name'] || '',
    'insurance.phone': data['Insurances'][0]['Company']['PhoneNumber'] || '',
    'insurance.group_name': data['Insurances'][0]['GroupName'] || '',
    'insurance.group_number': data['Insurances'][0]['GroupNumber'] || '',
  };

  return new Promise((resolve, reject) => {
    filler.fillForm(templatePath, outputPath, mapping, (err) => {
      exec('open ' + outputPath); // open file locally, macOS only

      resolve(outputPath);
    });
  });
};

module.exports = fill;