export default function Privacy() {
  return (
    <main className="bg-[#F5F1EB] text-[#2F2F2F]">

      {/* Intro Section */}
      <section className="px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] mb-12">
            Privacy Policy
          </h1>

        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-12 text-[#6B6B6B] leading-relaxed">

          <section>
            <h2 className="text-xl text-[#2F2F2F] mb-4">
              1. Information We Collect
            </h2>
            <p>
              Lite Orbit collects personal information voluntarily provided through
              subscription forms and contact inquiries. This may include your name
              and email address.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#2F2F2F] mb-4">
              2. How We Use Information
            </h2>
            <p>
              Information collected is used solely for communication purposes,
              including responding to inquiries and providing updates about
              Lite Orbit products and releases.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#2F2F2F] mb-4">
              3. Data Protection
            </h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect personal information from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#2F2F2F] mb-4">
              4. Third-Party Services
            </h2>
            <p>
              Lite Orbit may use trusted third-party services for hosting,
              analytics, and email communications. These providers process data
              solely for operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl text-[#2F2F2F] mb-4">
              5. Contact
            </h2>
            <p>
              For privacy-related inquiries, please contact us at
              contact@liteorbit.com.
            </p>
          </section>

        </div>
      </section>

    </main>
  );
}