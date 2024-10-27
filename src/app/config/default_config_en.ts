import { Config } from '../types/Config';
import { RendererType } from '@/app/types/RendererType';

// TODO: Medication, Allergies, Alert, Patient History

export const DefaultConfigEN: Config = {
  Patient: {
    icon: '/icons/user.svg',
    sectionDisplay: 'Patient',
    code: 'patient',
    section: {
      display: 'Patient',
      components: [
        {
          display: 'Personal Information',
          components: [
            {
              display: 'Identifier',
              path: 'Patient.identifier',
              renderer: RendererType.IDENTIFIER,
            },
            {
              display: 'Name',
              path: 'Patient.name',
              renderer: RendererType.HUMAN_NAME,
            },
            {
              display: 'Gender',
              path: 'Patient.gender',
              renderer: RendererType.DEFAULT,
            },
          ],
        },
        {
          display: 'Communication',
          components: [
            {
              display: 'Telecom',
              path: 'Patient.telecom',
              renderer: RendererType.CONTACT_POINT,
            },
            {
              display: 'Address',
              path: 'Patient.address',
              renderer: RendererType.ADDRESS,
            },
          ],
        },
      ],
    },
  },
  sectionMedications: {
    icon: '/icons/medications.svg',
    sectionDisplay: 'Medication Summary',
    code: '10160-0',
    section: {
      display: 'Medication(Statement/Request)',
      components: [
        {
          components: [
            {
              display: 'Medication Id',
              path: 'Medication.id',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Statement Status',
              path: 'MedicationStatement.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Request Status',
              path: 'MedicationRequest.status',
              renderer: RendererType.DEFAULT,
            },
          ],
        },
      ],
    },
  },
  sectionAllergies: {
    icon: '/icons/allergies.svg',
    sectionDisplay: 'Allergies and Intolerances',
    code: '48765-2',
    section: {
      display: 'Allergy or Intolerance',
      components: [
        {
          components: [
            {
              display: 'Clinical Status',
              path: 'AllergyIntolerance.clinicalStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Verification Status',
              path: 'AllergyIntolerance.verificationStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'AllergyIntolerance.category',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'AllergyIntolerance.category',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Criticality',
              path: 'AllergyIntolerance.criticality',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Code',
              path: 'AllergyIntolerance.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'AllergyIntolerance.category',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'AllergyIntolerance.category',
              renderer: RendererType.DEFAULT,
            },
          ],
        },
      ],
    },
  },
  sectionProblems: {
    icon: '/icons/problems.svg',
    sectionDisplay: 'Problems',
    code: '11450-4',
    section: {
      display: 'Problem',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Clinical Status',
              path: 'Condition.clinicalStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Patient',
              path: 'Condition.subject.reference',
              renderer: RendererType.LINK,
            },
            {
              display: 'Verification Status',
              path: 'Condition.verificationStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'Condition.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Severity',
              path: 'Condition.severity',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Condition.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Body Site',
              path: 'Condition.bodySite',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Disease Onset Date',
              path: 'Condition.onset.DateTime',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Age',
              path: 'Condition.onset.age',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Period',
              path: 'Condition.onset.period',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Range',
              path: 'Condition.onset.range',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Date',
              path: 'Condition.abatement.DateTime',
              renderer: RendererType.DEFAULT, // TODO should be changed i gues
            },
            {
              display: 'Disease abatement Age',
              path: 'Condition.abatement.age',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Period',
              path: 'Condition.abatement.period',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Range',
              path: 'Condition.abatement.range',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Recorded Date',
              path: 'Condition.recordedDate',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Stage',
              components: [
                {
                  display: 'Stage Summary',
                  path: 'Condition.stage.summary',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Stage Type',
                  path: 'Condition.stage.type',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Formal record of assessment',
                  path: 'Condition.stage.assessment.reference',
                  renderer: RendererType.LINK,
                },
                {
                  display: 'Evidence',
                  path: 'Condition.evidence',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionProceduresHx: {
    icon: '/icons/procedures.svg',
    sectionDisplay: 'Procedure History',
    code: '47519-4',
    section: {
      display: 'Procedure',
      components: [
        {
          components: [
            {
              display: 'Procedure Details',
              components: [
                {
                  display: 'Status',
                  path: 'Procedure.status',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Status Reason',
                  path: 'Procedure.statusReason',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Category',
                  path: 'Procedure.category',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Code',
                  path: 'Procedure.code.coding',
                  renderer: RendererType.CODING,
                },
                {
                  display: 'Performed Date/Period',
                  path: 'Procedure.performed',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Performer',
                  path: 'Procedure.performer.actor:Practitioner.name',
                  renderer: RendererType.HUMAN_NAME,
                },
                {
                  display: 'Reason Code',
                  path: 'Procedure.reasonCode',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Body Site',
                  path: 'Procedure.bodySite',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Outcome',
                  path: 'Procedure.outcome',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Complications',
                  path: 'Procedure.complication',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Follow Up',
                  path: 'Procedure.followUp',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Note',
                  path: 'Procedure.note',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionImmunizations: {
    icon: '/icons/immunizations.svg',
    sectionDisplay: 'Immunization History',
    code: '11369-6',
    section: {
      display: 'Immunization',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Status',
              path: 'Immunization.status',
              renderer: RendererType.DEFAULT, // Immunization status (completed, entered-in-error, etc.)
            },
            {
              display: 'Status Reason',
              path: 'Immunization.statusReason',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Vaccine Code',
              path: 'Immunization.vaccineCode',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Occurrence',
              path: 'Immunization.occurrence',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Recorded',
              path: 'Immunization.recorded',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Primary Source',
              path: 'Immunization.primarySource',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Report Origin',
              path: 'Immunization.reportOrigin',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Lot Number',
              path: 'Immunization.lotNumber',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Expiration Date',
              path: 'Immunization.expirationDate',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Site',
              path: 'Immunization.site',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Route',
              path: 'Immunization.route',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Dose Quantity',
              path: 'Immunization.doseQuantity',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Performer Function',
              path: 'Immunization.performer.function',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Note',
              path: 'Immunization.note',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Reason',
              path: 'Immunization.reasonCode',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Is Subpotent',
              path: 'Immunization.isSubpotent',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Subpotent Reason',
              path: 'Immunization.subpotentReason',
              renderer: RendererType.CODEABLE_CONCEPT, // Reason why the vaccine was subpotent
            },
            {
              display: 'Program Eligibility',
              path: 'Immunization.programEligibility',
              renderer: RendererType.CODEABLE_CONCEPT, // Program under which the vaccine was administered
            },
            {
              display: 'Funding Source',
              path: 'Immunization.fundingSource',
              renderer: RendererType.CODEABLE_CONCEPT, // Source of funding for the vaccine
            },
          ],
        },
        {
          display: 'Education',
          components: [
            {
              display: 'Document Type',
              path: 'Immunization.education.documentType',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Educational Material Reference',
              path: 'Immunization.education.reference',
              renderer: RendererType.DEFAULT, // The series in which the vaccine was administered
            },
            {
              display: 'Publication Date',
              path: 'Immunization.education.publicationDate',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Presentation Date',
              path: 'Immunization.education.presentationDate',
              renderer: RendererType.DEFAULT,
            },
          ],
        },
        {
          display: 'Applied protocol',
          components: [
            {
              display: 'Series',
              path: 'Immunization.protocolApplied.series',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Target Disease',
              path: 'Immunization.protocolApplied.targetDisease',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Dose Number within series',
              path: 'Immunization.protocolApplied.doseNumber', // Can be a positiveInt or string
              renderer: RendererType.DEFAULT, // Render based on the type (positiveInt or string)
            },
            {
              display: 'Recommended Number of doses',
              path: 'Immunization.protocolApplied.series',
              renderer: RendererType.DEFAULT, // The series in which the vaccine was administered
            },
          ],
        },
      ],
    },
  },
  sectionMedicalDevices: {
    icon: '/icons/medical_devices.svg',
    sectionDisplay: 'History of Medical Devices',
    code: '46264-8',
    section: {
      display: 'Medical Device Statement',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Status',
              path: 'DeviceUseStatement.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Occurrence',
              path: 'DeviceUseStatement.timing',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Recorded On',
              path: 'DeviceUseStatement.recordedOn',
              renderer: RendererType.DEFAULT, // Date the device use statement was recorded
            },
            {
              display: 'Reason',
              path: 'DeviceUseStatement.reasonCode',
              renderer: RendererType.CODEABLE_CONCEPT, // Reason for using the device
            },
            {
              display: 'Body Site',
              path: 'DeviceUseStatement.bodySite',
              renderer: RendererType.CODEABLE_CONCEPT, // Where the device was used on the body
            },
            {
              display: 'Note',
              path: 'DeviceUseStatement.note',
              renderer: RendererType.DEFAULT, // Additional notes about the device use
            },
          ],
        },
      ],
    },
  },
  sectionResults: {
    icon: '/icons/results.svg',
    sectionDisplay: 'Diagnostic tests and laboratory data',
    code: '30954-2',
    section: {
      display: 'Diagnostic test or laboratory data',
      components: [
        {
          components: [
            {
              display: 'Status',
              path: 'DiagnosticReport.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'DiagnosticReport.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'DiagnosticReport.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Clinically relevant time/time-period for report',
              path: 'DiagnosticReport.effective',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Issued Date',
              path: 'DiagnosticReport.issued',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Conclusion',
              path: 'DiagnosticReport.conclusion',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Conclusion Code',
              path: 'DiagnosticReport.conclusionCode',
              renderer: RendererType.CODEABLE_CONCEPT,
            }, //TBD media
            {
              display: 'Status',
              path: 'Observation.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'Observation.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Observation.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Clinically relevant time/time-period for observation',
              path: 'Observation.effective',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Date/Time this version was made available',
              path: 'Observation.issued',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Performer',
              path: 'Observation.performer:Practitioner.name',
              renderer: RendererType.HUMAN_NAME,
            },
            {
              display: 'Performer',
              path: 'Observation.performer:Organization.name',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Value',
              path: 'Observation.value',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Data Absent Reason',
              path: 'Observation.dataAbsentReason',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Interpretation',
              path: 'Observation.interpretation',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Note',
              path: 'Observation.note',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Body site',
              path: 'Observation.bodySite',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Method',
              path: 'Observation.method',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Reference Range',
              components: [
                {
                  display: 'Low Range',
                  path: 'Observation.referenceRange.low',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'High Range',
                  path: 'Observation.referenceRange.high',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Reference range qualifier',
                  path: 'Observation.referenceRange.type',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Applies to',
                  path: 'Observation.referenceRange.appliesTo',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Applicable age range',
                  path: 'Observation.referenceRange.age',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionVitalSigns: {
    icon: '/icons/vital_signs.svg',
    sectionDisplay: 'Vital Signs',
    code: '8716-3',
    section: {
      display: 'Vital Sign',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Status',
              path: 'Observation.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'Observation.category:VSCat',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Observation.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Time',
              path: 'Observation.effective.effectiveDateTime',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Period',
              path: 'Observation.effective.effectivePeriod',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Performer',
              path: 'Observation.performer',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Value Quantity',
              path: 'Observation.value.valueQuantity',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Value String',
              path: 'Observation.value.valueString',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Value Code',
              path: 'Observation.value.valueCodeableConcept',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Value Time',
              path: 'Observation.value.valueQuantity',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Body Site',
              path: 'Observation.bodySite',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Note',
              path: 'Observation.note',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Interpretation',
              path: 'Observation.interpretation',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Method',
              path: 'Observation.method',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Reference Range',
              components: [
                {
                  display: 'Low Range',
                  path: 'Observation.referenceRange.low',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'High Range',
                  path: 'Observation.referenceRange.high',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Reference range qualifier',
                  path: 'Observation.referenceRange.type',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Applies to',
                  path: 'Observation.referenceRange.appliesTo',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Applicable age range',
                  path: 'Observation.referenceRange.age',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
            {
              display: 'Components',
              components: [
                {
                  display: 'Quantity',
                  path: 'Observation.component.valueQuantity',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'CodeableConcept',
                  path: 'Observation.component.valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'String',
                  path: 'Observation.component.valueString',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Boolean',
                  path: 'Observation.component.valueBoolean',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Integer',
                  path: 'Observation.component.valueInteger',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Range',
                  path: 'Observation.component.valueRange',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Ratio',
                  path: 'Observation.component.valueRatio',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'SampledData',
                  path: 'Observation.component.valueSampledData',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Time',
                  path: 'Observation.component.valueTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'DateTime',
                  path: 'Observation.component.valueDateTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.component.valuePeriod',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionPastIllnessHx: {
    icon: '/icons/pastIllness.svg',
    sectionDisplay: 'Past illness',
    code: '11348-0',
    section: {
      display: 'Past illness',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Clinical Status',
              path: 'Condition.clinicalStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Patient',
              path: 'Condition.subject.reference',
              renderer: RendererType.LINK,
            },
            {
              display: 'Verification Status',
              path: 'Condition.verificationStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'Condition.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Severity',
              path: 'Condition.severity',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Condition.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Body Site',
              path: 'Condition.bodySite',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Disease Onset Date',
              path: 'Condition.onset.DateTime',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Age',
              path: 'Condition.onset.age',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Period',
              path: 'Condition.onset.period',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Range',
              path: 'Condition.onset.range',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Date',
              path: 'Condition.abatement.DateTime',
              renderer: RendererType.DEFAULT, // TODO should be changed i gues
            },
            {
              display: 'Disease abatement Age',
              path: 'Condition.abatement.age',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Period',
              path: 'Condition.abatement.period',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Range',
              path: 'Condition.abatement.range',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Recorded Date',
              path: 'Condition.recordedDate',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Stage',
              components: [
                {
                  display: 'Stage Summary',
                  path: 'Condition.stage.summary',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Stage Type',
                  path: 'Condition.stage.type',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Formal record of assessment',
                  path: 'Condition.stage.assessment.reference',
                  renderer: RendererType.LINK,
                },
                {
                  display: 'Evidence',
                  path: 'Condition.evidence',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionFunctionalStatus: {
    icon: '/icons/functionalStatus.svg',
    sectionDisplay: 'Functional Status Assessment',
    code: '47420-5',
    section: {
      display: 'Functional Status',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Clinical Status',
              path: 'Condition.clinicalStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Patient',
              path: 'Condition.subject.reference',
              renderer: RendererType.LINK,
            },
            {
              display: 'Verification Status',
              path: 'Condition.verificationStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'Condition.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Severity',
              path: 'Condition.severity',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Condition.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Body Site',
              path: 'Condition.bodySite',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Disease Onset Date',
              path: 'Condition.onset.DateTime',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Age',
              path: 'Condition.onset.age',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Period',
              path: 'Condition.onset.period',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease Onset Range',
              path: 'Condition.onset.range',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Date',
              path: 'Condition.abatement.DateTime',
              renderer: RendererType.DEFAULT, // TODO should be changed i gues
            },
            {
              display: 'Disease abatement Age',
              path: 'Condition.abatement.age',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Period',
              path: 'Condition.abatement.period',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Disease abatement Range',
              path: 'Condition.abatement.range',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Recorded Date',
              path: 'Condition.recordedDate',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Stage',
              components: [
                {
                  display: 'Stage Summary',
                  path: 'Condition.stage.summary',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Stage Type',
                  path: 'Condition.stage.type',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Formal record of assessment',
                  path: 'Condition.stage.assessment.reference',
                  renderer: RendererType.LINK,
                },
                {
                  display: 'Evidence',
                  path: 'Condition.evidence',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionPlanOfCare: {
    icon: '/icons/plan_of_care.svg',
    sectionDisplay: 'Plan of care',
    code: '18776-5',
    section: {
      display: 'Plan of care',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Care plan Status',
              path: 'CarePlan.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Intent',
              path: 'CarePlan.intent',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Care plan Category',
              path: 'CarePlan.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Title',
              path: 'CarePlan.title',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Description',
              path: 'CarePlan.description',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Care plan Period',
              path: 'CarePlan.period',
              renderer: RendererType.DEFAULT, //Period renderer
            },
            {
              display: 'Author',
              path: 'CarePlan.author',
              renderer: RendererType.DEFAULT, //reference
            },
            {
              display: 'Addressed health issue',
              path: 'CarePlan.address',
              renderer: RendererType.DEFAULT, //reference
            },
            {
              display: 'First Record',
              path: 'CarePlan.created',
              renderer: RendererType.DEFAULT, //DATE renderer
            },
            {
              display: 'Care plan health issue',
              path: 'CarePlan.created',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Note',
              path: 'CarePlan.note',
              renderer: RendererType.DEFAULT,
            },
          ],
        },
        {
          display: 'Activity',
          components: [
            {
              display: 'Care plan health issue',
              path: 'CarePlan.activity.outcomeCodeableConcept',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Detail',
              components: [
                {
                  display: 'Kind',
                  path: 'CarePlan.activity.detail.kind',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Activity Code',
                  path: 'CarePlan.activity.detail.code',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Reason Information',
                  components: [
                    {
                      display: 'Reason Code',
                      path: 'CarePlan.activity.detail.reasonCode',
                      renderer: RendererType.CODEABLE_CONCEPT, // Why activity is necessary
                    },
                    {
                      display: 'Reason Reference',
                      path: 'CarePlan.activity.detail.reasonReference',
                      renderer: RendererType.DEFAULT, // References to related resources (Condition, Observation, etc.)
                    },
                  ],
                },
                {
                  display: 'Related Goals',
                  path: 'CarePlan.activity.detail.goal',
                  renderer: RendererType.DEFAULT, // Reference
                },
                {
                  display: 'Status Reason',
                  path: 'CarePlan.activity.detail.statusReason',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Do Not Perform',
                  path: 'CarePlan.activity.detail.doNotPerform',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Schedule Information',
                  components: [
                    {
                      display: 'Scheduled Timing',
                      path: 'CarePlan.activity.detail.scheduledTiming',
                      renderer: RendererType.DEFAULT, // time
                    },
                    {
                      display: 'Scheduled Period',
                      path: 'CarePlan.activity.detail.scheduledPeriod',
                      renderer: RendererType.DEFAULT, // Period
                    },
                    {
                      display: 'Scheduled String',
                      path: 'CarePlan.activity.detail.scheduledString',
                      renderer: RendererType.DEFAULT,
                    },
                  ],
                },
                {
                  display: 'Location',
                  path: 'CarePlan.activity.detail.location',
                  renderer: RendererType.DEFAULT, // Location reference
                },
                {
                  display: 'Performer',
                  path: 'CarePlan.activity.detail.performer',
                  renderer: RendererType.DEFAULT, // Reference
                },
                {
                  display: 'Product Codeable Concept',
                  path: 'CarePlan.activity.detail.productCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'Product Reference',
                  path: 'CarePlan.activity.detail.productReference',
                  renderer: RendererType.DEFAULT, // Reference
                },
                {
                  display: 'Daily Amount',
                  path: 'CarePlan.activity.detail.dailyAmount',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Quantity',
                  path: 'CarePlan.activity.detail.quantity',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Description',
                  path: 'CarePlan.activity.detail.description',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionSocialHistory: {
    icon: '/icons/socialHistory.svg',
    sectionDisplay: 'Social History',
    code: '29762-2',
    section: {
      display: 'Social History',
      components: [
        {
          display: 'Tobacco Use',
          components: [
            {
              display: 'Status',
              path: 'Observation.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'Observation.category',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Code',
              path: 'Observation.code.coding',
              renderer: RendererType.CODING,
            },
            {
              display: 'Effective',
              path: 'Observation.effective',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Performer',
              path: 'Observation.performer',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Current Smoking status',
              path: 'Observation.valueCodeableConcept',
              renderer: RendererType.CODING,
            },
            {
              display: 'Components',
              components: [
                {
                  display: 'Quantity',
                  path: 'Observation.valueQuantity',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'CodeableConcept',
                  path: 'Observation.valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'String',
                  path: 'Observation.valueString',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Boolean',
                  path: 'ObservationvalueBoolean',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Integer',
                  path: 'Observation.valueInteger',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Range',
                  path: 'Observation.valueRange',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Ratio',
                  path: 'Observation.valueRatio',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'SampledData',
                  path: 'ObservationvalueSampledData',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Time',
                  path: 'Observation.valueTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'DateTime',
                  path: 'Observation.valueDateTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.valuePeriod',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
        {
          display: 'Alcohol Use',
          components: [
            {
              display: 'Status',
              path: 'Observation.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Category',
              path: 'Observation.category',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Code',
              path: 'Observation.code.coding',
              renderer: RendererType.CODING,
            },
            {
              display: 'Effective',
              path: 'Observation.effective',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Performer',
              path: 'Observation.performer',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Current Smoking status',
              path: 'Observation.value[x]:valueCodeableConcept',
              renderer: RendererType.CODING,
            },
            {
              display: 'Components',
              components: [
                {
                  display: 'Quantity',
                  path: 'Observation.value.valueQuantity',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'CodeableConcept',
                  path: 'Observation.value.valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'String',
                  path: 'Observation.value.valueString',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Boolean',
                  path: 'Observation.value.valueBoolean',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Integer',
                  path: 'Observation.value.valueInteger',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Range',
                  path: 'Observation.value.valueRange',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Ratio',
                  path: 'Observation.value.valueRatio',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'SampledData',
                  path: 'Observation.value.valueSampledData',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Time',
                  path: 'Observation.value.valueTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'DateTime',
                  path: 'Observation.value.valueDateTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.value.valuePeriod',
                  renderer: RendererType.DEFAULT,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  sectionPregnancyHx: {
    icon: '/icons/pregnancyHistory.svg',
    sectionDisplay: 'Pregnancy history',
    code: '10162-6',
    section: {
      display: 'History of pregnancies',
      components: [
        {
          display: 'Pregnancy Status',
          components: [
            {
              display: 'Status',
              path: 'Observation.status',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'Observation.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Observation.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Effective',
              path: 'Observation.effective',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Performer',
              path: 'Observation.performer',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Components',
              components: [
                {
                  display: 'Quantity',
                  path: 'Observation.value.valueQuantity',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'CodeableConcept',
                  path: 'Observation.value.valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'String',
                  path: 'Observation.value.valueString',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Boolean',
                  path: 'Observation.value.valueBoolean',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Integer',
                  path: 'Observation.value.valueInteger',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Range',
                  path: 'Observation.value.valueRange',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Ratio',
                  path: 'Observation.value.valueRatio',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'SampledData',
                  path: 'Observation.value.valueSampledData',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Time',
                  path: 'Observation.value.valueTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'DateTime',
                  path: 'Observation.value.valueDateTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.value.valuePeriod',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.value[x]:valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
              ],
            },
            {
              display: 'Interpretation',
              path: 'Observation.interpretation',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Note',
              path: 'Observation.note',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Method',
              path: 'Observation.method',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Expected Delivery Date',
              path: 'Observation.hasMember',
              renderer: RendererType.DEFAULT, //reference
            },
          ],
        },
        {
          display: 'Pregnancy Outcome ',
          components: [
            {
              display: 'Status',
              path: 'Observation.status',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'Observation.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Code',
              path: 'Observation.code',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Effective',
              path: 'Observation.effective',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Performer',
              path: 'Observation.performer',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Components',
              components: [
                {
                  display: 'Quantity',
                  path: 'Observation.value.valueQuantity',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'CodeableConcept',
                  path: 'Observation.value.valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
                {
                  display: 'String',
                  path: 'Observation.value.valueString',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Boolean',
                  path: 'Observation.value.valueBoolean',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Integer',
                  path: 'Observation.value.valueInteger',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Range',
                  path: 'Observation.value.valueRange',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Ratio',
                  path: 'Observation.value.valueRatio',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'SampledData',
                  path: 'Observation.value.valueSampledData',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Time',
                  path: 'Observation.value.valueTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'DateTime',
                  path: 'Observation.value.valueDateTime',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.value.valuePeriod',
                  renderer: RendererType.DEFAULT,
                },
                {
                  display: 'Period',
                  path: 'Observation.value[x]:valueCodeableConcept',
                  renderer: RendererType.CODEABLE_CONCEPT,
                },
              ],
            },
            {
              display: 'Interpretation',
              path: 'Observation.interpretation',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Note',
              path: 'Observation.note',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Method',
              path: 'Observation.method',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Expected Delivery Date',
              path: 'Observation.hasMember',
              renderer: RendererType.DEFAULT, //reference
            },
          ],
        },
      ],
    },
  },
  sectionAdvanceDirectives: {
    icon: '/icons/advanceDirectives.svg',
    sectionDisplay: 'Advance directives',
    code: '42348-3',
    section: {
      display: 'Advance directive',
      components: [
        {
          display: 'General Information',
          components: [
            {
              display: 'Status',
              path: 'Consent.status',
              renderer: RendererType.DEFAULT,
            },
            {
              display: 'Scope',
              path: 'Consent.scope',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Category',
              path: 'Consent.category',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
            {
              display: 'Performer',
              path: 'Consent.performer',
              renderer: RendererType.DEFAULT,
            },
          ],
        },
      ],
    },
  },

  // Note: Not in APS
  // sectionPatientHistory: {
  //   icon: '/icons/patient_story.svg',
  //   sectionDisplay: 'Patient History',
  //   code: '81338-6',
  //   section: {
  //     display: 'Patient History',
  //     components: [],
  //   },
  // },
  // sectionAlerts: {
  //   icon: '/icons/alerts.svg',
  //   sectionDisplay: 'Alerts',
  //   code: '104605-1',
  //   section: {
  //     display: 'Alerts',
  //     components: [
  //       {
  //         display: 'Flag priority',
  //         path: 'Flag.priority',
  //         renderer: RendererType.DEFAULT,
  //       },
  //       {
  //         display: 'Status',
  //         path: 'Flag.status',
  //         renderer: RendererType.DEFAULT,
  //       },
  //       {
  //         display: 'Category',
  //         path: 'Flag.category',
  //         renderer: RendererType.CODEABLE_CONCEPT,
  //       },
  //       {
  //         display: 'Code',
  //         path: 'Flag.code',
  //         renderer: RendererType.CODEABLE_CONCEPT,
  //       },
  //       {
  //         display: 'Subject',
  //         path: 'Flag.subject:',
  //         renderer: RendererType.LINK,
  //       },
  //       {
  //         display: 'Period',
  //         path: 'Flag.period',
  //         renderer: RendererType.LINK,
  //       },
  //       {
  //         display: 'Encounter',
  //         path: 'Flag.encounter:',
  //         renderer: RendererType.LINK,
  //       },
  //       {
  //         display: 'Author',
  //         path: 'Flag.author:',
  //         renderer: RendererType.LINK,
  //       },
  //     ],
  //   },
  // },
};
