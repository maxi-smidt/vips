import React from 'react';
import Image from 'next/image';

export default function StartPage() {
  return (
    <>
      <div className="p-8 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-left mb-6">
          Willkommen beim IPS Viewer
        </h1>

        <section className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Der <strong>IPS Viewer</strong> ist ein Open-Source-Projekt, das von
            engagierten Studierenden der
            <a
              href="https://www.fh-ooe.at/hagenberg"
              className="text-blue-500 hover:underline"
            >
              {' '}
              FH Hagenberg
            </a>{' '}
            und
            <a
              href="https://www.jku.at"
              className="text-blue-500 hover:underline"
            >
              {' '}
              JKU Linz
            </a>{' '}
            entwickelt wurde. Es entstand im Rahmen des{' '}
            <a
              href="https://fhir.hl7.at/r4-ELGA-AustrianPatientSummary-main/contest.html"
              className="text-blue-500 hover:underline"
            >
              ELGA Contest
            </a>{' '}
            und zielt darauf ab, die Nutzung von FHIR-basierten Patientendaten
            einfacher und intuitiver zu gestalten.
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
                  Erstellen Sie eine PDF-Version Ihrer Patientendaten mit einem
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
            Der IPS Viewer unterstützt verschiedene Sektionen und visualisiert
            Daten gemäß der offiziellen Spezifikation. Die Farben in der Sidebar
            sind entsprechend angepasst, um eine klare und strukturierte
            Benutzeroberfläche zu bieten.
          </p>
          <Image
            src={`${process.env.IMAGE_PATH}/images/IPS_composition.png`}
            width={700}
            height={440}
            alt="IPS Composition"
          ></Image>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sicherheit
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Ihre Daten sind sicher: Der IPS Viewer speichert keine Daten
            dauerhaft. Alle Daten werden nur temporär verarbeitet und verlassen
            Ihr Gerät nicht.
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
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Schreib uns!
          </button>
        </section>
      </div>
    </>
  );
}
