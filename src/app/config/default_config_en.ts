import { Config } from '../types/Config';
import { RendererType } from '@/app/types/RendererType';

export const DefaultConfigEN: Config = {
  Patient: {
    icon: '/icons/user.svg',
    sectionDisplay: 'Patient',
    code: 'patient',
    section: {
      title: 'Patient',
      renderers: [
        {
          title: 'Personal Information',
          renderers: [
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
          title: 'Communication',
          renderers: [
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
      title: 'Medication(Statement/Request)',
      renderers: [
        {
          renderers: [
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
      title: 'Allergy or Intolerance',
      renderers: [
        {
          renderers: [
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
      title: 'Problem',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'Clinical Status',
              path: 'Condition.clinicalStatus',
              renderer: RendererType.CODEABLE_CONCEPT,
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
              title: 'Stage',
              renderers: [
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
    icon: '/icons/procedure.svg',
    sectionDisplay: 'Procedure History',
    code: '47519-4',
    section: {
      title: 'Procedure',
      renderers: [
        {
          renderers: [
            {
              title: 'Procedure Details',
              renderers: [
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
    icon: '/icons/immunization.svg',
    sectionDisplay: 'Immunization History',
    code: '11369-6',
    section: {
      title: 'Immunization',
      renderers: [
        {
          title: 'General Information',
          renderers: [
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
          title: 'Education',
          renderers: [
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
          title: 'Applied protocol',
          renderers: [
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
    icon: '/icons/medicalDevices.svg',
    sectionDisplay: 'History of Medical Devices',
    code: '46264-8',
    section: {
      title: 'Medical Device Statement',
      renderers: [
        {
          title: 'General Information',
          renderers: [
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
      title: 'Diagnostic test or laboratory data',
      renderers: [
        {
          renderers: [
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
              title: 'Reference Range',
              renderers: [
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
                  path: 'Observation.referenceRange.appliesTO',
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
  /*sectionVitalSigns: {
    icon: '/icons/vitalSigns.svg',
    sectionDisplay: 'Vital Signs',
    code: '8716-3',
    section: {
      title: 'Vital Sign',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
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
      title: 'Past illness',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
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
      title: 'Functional Status',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
            },
          ],
        },
      ],
    },
  },
  sectionPlanOfCare: {
    icon: '/icons/medicalDevices.svg',
    sectionDisplay: 'Plan of care',
    code: '18776-5',
    section: {
      title: 'Plan of care',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
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
      title: 'Social History',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
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
      title: 'History of pregnancies',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
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
      title: 'Advance directive',
      renderers: [
        {
          title: 'General Information',
          renderers: [
            {
              display: 'TBD',
              path: 'TBD',
              renderer: RendererType.TBD, // Immunization status (completed, entered-in-error, etc.)
            },
          ],
        },
      ],
    },
  },*/
};
