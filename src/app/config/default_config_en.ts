import { Config } from '../types/Config';
import { RendererType } from '@/app/types/RendererType';

export const DefaultConfigEN: Config = {
  Patient: {
    icon: '/icons/user.svg',
    section: {
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
  Condition: {
    icon: '/icons/allergies.svg',
    section: {
      renderers: [
        {
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
          ],
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
  },
  AllergyIntolerance: {
    icon: '/icons/allergies',
    section: {
      renderers: [
        {
          title: 'Allergies and Intolerances',
          renderers: [
            {
              display: '',
              path: '',
              renderer: RendererType.CODEABLE_CONCEPT,
            },
          ],
        },
      ],
    },
  },
};
