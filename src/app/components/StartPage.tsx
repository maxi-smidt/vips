import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { useToast } from '@/app/hooks/useToast';

export default function StartPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: `[FEEDBACK] ${title}`,
        body: [description, '---', 'Feedback submitted by VIPS Viewer'].join(
          '\n',
        ),
        labels: ['feedback'],
      };

      const response = await fetch(
        'https://api.github.com/repos/maxi-smidt/vips/issues',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${process.env.NEXT_PUBLIC_ISSUE_TOKEN}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Error creating issue');
      }

      showSuccess('Feedback erfolgreich gesendet!');
      setTitle('');
      setDescription('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-left mb-6">
          Willkommen beim IPS Viewer
        </h1>

        <section className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Das Ziel des VIPS IPS Viewers ist es, FHIR Resourcen des IPS
            grafisch ansprechend darzustellen und zusätzliche Funktionalitäten
            zur Verfügung zu stellen, welche die Benutzung der Applikation
            erleichtern sollen.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Funktionalitäten
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-700">Funktion</th>
                <th className="py-2 px-4 text-gray-700">Beschreibung</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 flex items-center text-gray-700">
                  <span className="mr-2">📄</span>
                  <strong>PDF-Export</strong>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  Erstellen Sie eine PDF-Version der Patientenkurzakte mit einem
                  Klick.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 flex items-center text-gray-700">
                  <span className="mr-2">🔍</span>
                  <strong>Suchfunktion</strong>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  Nutzen Sie eine integrierte Suchfunktion, um schnell die
                  benötigten Informationen zu finden.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 flex items-center text-gray-700">
                  <span className="mr-2">📂</span>
                  <strong>Vielseitige Datei-Upload-Optionen</strong>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  Wählen Sie zwischen Datei-Upload, direktem Einfügen des
                  Inhalts oder dem Abrufen der Daten von einem FHIR-Server.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Unterstützte Sektionen
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Der IPS Viewer unterstützt die im IPS Implementation Guide
            spezifizierten Sektionen, wobei auch die Farben in der Sidebar
            entsprechend angepasst sind.
          </p>
          <Image
            src={`${process.env.IMAGE_PATH}/images/IPS_composition.png`}
            width={700}
            height={440}
            alt="IPS Composition"
          />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sicherheit
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Der IPS Viewer lädt die ausgewählten Daten nur lokal im Browser. Das
            bedeutet, dass die Daten den Rechner nicht verlassen und nicht ins
            Internet kommen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Über uns
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Der <strong>IPS Viewer</strong> ist ein Open-Source-Projekt, das von
            Studierenden der FH Hagenberg und JKU Linz entwickelt wird. Die
            Umsetzung erfolgte im Rahmen des{' '}
            <a
              href="https://fhir.hl7.at/r4-ELGA-AustrianPatientSummary-main/contest.html"
              className="text-blue-500 hover:underline"
            >
              IPS Visualization Contest
            </a>{' '}
            der HL7 Austria und ELGA GmbH.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Feedback oder Fragen?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Wir freuen uns über Ihr Feedback! Bei Fragen oder Anregungen, zögern
            Sie nicht, uns zu kontaktieren.
          </p>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <InputText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel"
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <InputTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschreibung"
                required
                rows={4}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              label={loading ? 'Sending...' : 'Feedback senden'}
              className="p-button p-button-primary"
              loading={loading}
              disabled={loading}
            />
          </form>
        </section>
      </div>
    </>
  );
}
